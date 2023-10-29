import React from 'react'
import phone_image from '/assets/login-phone.png';
import login_facebook_icon from '/assets/login-facebook-icon.png';
import { Link } from 'react-router-dom';
import { useLoginMutation } from '../redux/api/auth/auth';
import { Spinner } from '@material-tailwind/react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/reducers/user.reducer';
import Cookies from 'js-cookie'
const Login = () => {
    const [errorMessage, setErrorMessage] = useState({ message: "" });
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [userCredentials, setUserCredentials] = useState<User | null>(null)
    const [showPassword, setShowPassword] = useState({ typeIsPassword: false, showChanger: false })
    const openSubmitButton = (e: React.FormEvent<HTMLInputElement>) => {
        if ('value' in e.target) {
            let value = e.target.value as string;
            setShowPassword({ ...showPassword, showChanger: value.length != 0 })
            if (value.length > 8) {
                setSubmitDisabled(false)
            }
        }
    }
    const [loginMutation, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch()
    const handleLogin = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setErrorMessage({ message: "" })
        const target = e.target as typeof e.target & {
            username: { value: any };
            password: { value: string };
        };
        const text = target.username.value;
        const password = target.password.value;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const phoneRegex = /^(\+\d{1,4}\s?)?(\d{1,4}[-\.\s]?)?(\d{2,6}[-\.\s]?)?(\d{2,6}[-\.\s]?)?(\d{2,6}[-\.\s]?)?(\d{2,6}[-\.\s]?)?(\d{1,6})$/;
        const usernameRegex = /^[a-zA-Z0-9_.]+$/;
        try {
            if (emailRegex.test(text)) {
                setUserCredentials({
                    email: text,
                    password
                })
            } else if (phoneRegex.test(text)) {
                const withOutSpace: string = text.replaceAll(/ /g, "");
                setUserCredentials({
                    mobile: withOutSpace,
                    password
                })
            } else if (usernameRegex.test(text)) {
                setUserCredentials({
                    username: text,
                    password
                })
            } else {
                setErrorMessage({ message: "Invalid credentials" })
                return
            }
            if (!!userCredentials) {
                const result = await loginMutation(userCredentials);
                if ('error' in result) {
                    if ('data' in result.error) {
                        let message = result.error.data as { message: string }
                        setErrorMessage(message)
                    }
                } else {
                    setErrorMessage({ message: "" })
                    const { data } = result;
                    dispatch(setUser({ user: data, auth: true }));
                    if ('token' in data) {
                        let token = data.token as string
                        Cookies.set("token", token, { expires: Date.now() });
                    }
                }
            }
        } catch (err) {
            console.error('Login Error:', err);
        }
    }
    return (
        <div className='h-screen w-full flex justify-center items-center'>
            <div className='w-full  flex justify-center items-center gap-x-8'>
                <div className='h-full hidden lg:block'>
                    <img src={phone_image} alt="phone" className='h-full w-full' />
                </div>
                <form onSubmit={handleLogin} className=' max-w-[350px]  flex flex-col justify-center items-center  h-full lg:w-auto md:w-auto'>
                    <div className='lg:border md:border border-[#DBDBDB] px-8 flex flex-col items-center py-7'>
                        <div className='my-2 mb-4'>
                            <i data-visualcompletion="css-img" aria-label="Instagram" role="img" style={{ backgroundImage: 'url("https://static.cdninstagram.com/rsrc.php/v3/yS/r/ajlEU-wEDyo.png")', backgroundPosition: '0px -52px', backgroundSize: 'auto', width: 175, height: 51, backgroundRepeat: 'no-repeat', display: 'inline-block' }} />
                        </div>
                        <div className='space-y-2'>
                            <div className='border border-[#DBDBDB] w-[260px] focus-within:border-gray-500'>
                                <input required placeholder='Phone number, username, or email' maxLength={75} type="text" name='username'
                                    className='w-full outline-none text-xs pt-[9px] pb-[7px] pl-[8px] placeholder:text-gray-700' />
                            </div>
                            <div className='border border-[#DBDBDB] relative w-[260px] focus-within:border-gray-500'>
                                <input onChange={openSubmitButton} required placeholder='Password' type={showPassword.typeIsPassword ? "password" : "text"} minLength={8} name='password'
                                    className='w-full outline-none text-xs pt-[9px] pb-[7px] pl-[8px] placeholder:text-gray-700' />
                                {
                                    showPassword.showChanger &&
                                    <button onClick={() => setShowPassword(prev => ({ ...prev, typeIsPassword: !showPassword.typeIsPassword }))} type="button" className='absolute right-1 top-1.5 text-[12.3px] font-bold hover:opacity-50 text-[#313131]'><span>{showPassword.typeIsPassword ? "Hide" : "Show"}</span></button>
                                }
                            </div>
                        </div>
                        <div className='space-y-[18px] w-[260px] mt-[14px]'>
                            <button disabled={submitDisabled} className={` py-[6px] w-full flex items-center justify-center  rounded-lg 
                          ${submitDisabled ? 'bg-[#7fc5f3]' : 'bg-[#0095F6]'}
                            `} type='submit'>{isLoading ? <Spinner /> : <span className='text-white font-semibold text-sm'>Log in</span>}</button>
                            <div className='flex items-center w-full justify-between'>
                                <hr className='w-[40%] bg-[#DBDBDB]' />
                                <span className='font-semibold text-[13px] text-[#737373]'>OR</span>
                                <hr className='w-[40%] bg-[#DBDBDB]' />
                            </div>
                            {
                                errorMessage.message
                                &&
                                <p className='text-red-500 text-xs text-center'>
                                    {errorMessage.message}
                                </p>
                            }
                        </div>
                        <div className='mt-[29px] space-y-4 text-center'>
                            <button type='button' className='flex items-center justify-center gap-x-2'>
                                <img src={login_facebook_icon} alt='facebook' />
                                <span className='text-[#385185] font-semibold text-sm'>Log in with Facebook</span>
                            </button>
                            <p className='text-[#00376B] text-xs cursor-pointer font-medium'>Forgot password?</p>
                        </div>
                    </div>
                    <div className='lg:border md:border w-full mt-5  py-[21px] gap-1 border-[#DBDBDB] flex items-center justify-center'>
                        <p className='text-sm text-black'>Don't have an account? </p>
                        <Link to={'/sign-up'} className='text-[#0095F6] font-semibold text-sm cursor-pointer'>Sign up</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;
