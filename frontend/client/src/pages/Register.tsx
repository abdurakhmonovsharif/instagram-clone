import { useTitle } from '../helpers/useTitle'
import { Link } from 'react-router-dom'
import React from 'react'
import { IoMdRefresh } from 'react-icons/io'
import { AiOutlineCloseCircle } from 'react-icons/ai'
const Facebook_icon = () => <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width={20} height={20} viewBox="0 0 50 50" style={{}} fill='#FFF' className="icon icons8-Facebook-Filled">    <path d="M40,0H10C4.486,0,0,4.486,0,10v30c0,5.514,4.486,10,10,10h30c5.514,0,10-4.486,10-10V10C50,4.486,45.514,0,40,0z M39,17h-3 c-2.145,0-3,0.504-3,2v3h6l-1,6h-5v20h-7V28h-3v-6h3v-3c0-4.677,1.581-8,7-8c2.902,0,6,1,6,1V17z" /></svg>
const Register = () => {
    const [tabIndex, setTabIndex] = React.useState('0');
    const formRef = React.useRef<HTMLFormElement>(null);
    const [showGenerateBtn, setShowGenerateBtn] = React.useState(false)
    const [emailValid, setEmailValid] = React.useState(false)
    const [userCredentials, setUserCredentials] = React.useState<User | null>(null);
    const [errorMessage, setErrorMessage] = React.useState({ message: "" });
    // change meta title
    useTitle("Sign up • Instagram");
    const handleRegister = (e: React.SyntheticEvent, index: string) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            email: { value: any };
            fullname: { value: string };
            username: { value: string };
            password: { value: string };
        };
        const username = target.username.value;
        const email_or_mobile = target.email.value;
        const fullname = target.fullname.value;
        const password = target.password.value;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const phoneRegex = /^(\+\d{1,4}\s?)?(\d{1,4}[-\.\s]?)?(\d{2,6}[-\.\s]?)?(\d{2,6}[-\.\s]?)?(\d{2,6}[-\.\s]?)?(\d{2,6}[-\.\s]?)?(\d{1,6})$/;
        const usernameRegex = /^[a-zA-Z0-9_.]+$/;
        if (!usernameRegex.test(username)) {
            setErrorMessage({ message: "Usernames can only use letters, numbers, underscores and periods." })
            return
        }
        else if (!emailRegex.test(email_or_mobile)) {
            setEmailValid(true)
        }
        else {
            if (tabIndex == '0') {
                if (emailRegex.test(email_or_mobile)) {
                    setUserCredentials({
                        email: email_or_mobile,
                        fullname,
                        username,
                        password
                    })
                } else if (phoneRegex.test(email_or_mobile)) {
                    setUserCredentials({
                        mobile: email_or_mobile,
                        fullname,
                        username,
                        password
                    })
                }
                localStorage.setItem("firstTab_userCredentials", JSON.stringify(userCredentials))
            } else if (tabIndex == '1') {

            }
        }

    }
    const LocalstorageSaver = () => {

    }


    const generateUsername = () => {
        if (formRef.current) {
            const usernameInput = formRef.current.querySelector('input[name="username"]');
            const fullnameInput = formRef.current.querySelector('input[name="fullname"]');

            if (usernameInput && fullnameInput) {
                if ('value' in usernameInput && 'value' in fullnameInput) {
                    const fullname = fullnameInput.value as string;
                    const username = usernameInput.value as string
                    if (fullname.length != 0) {
                        let generatedUsername = fullname.replace(/ /g, '_').replace(/[^a-zA-Z0-9_]/g, '');
                        usernameInput.value = generatedUsername + "" + Math.round(Math.random() * 10000)
                    } else {
                        const removeNumbers = username.replace(/[0-9]/g, "")
                        usernameInput.value = removeNumbers + "" + Math.round(Math.random() * 2559)
                    }
                }
            }
        }
    }
    const showUsernameGenerateBtn = (e: React.FormEvent<HTMLInputElement>) => {
        if ('value' in e.target) {
            let value = e.target.value as string;
            setShowGenerateBtn(value.length != 0)
        }
    }
    const changeTabIndex = (index: string) => {
        setTabIndex(index);
    }
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center p-2.5">
            <div className="lg:border md:border py-6 border-[#DBDBDB] max-w-[360px] flex flex-col items-center px-6">

                <div className='mt-9 flex items-center justify-center flex-col text-center gap-y-4'>
                    <i data-visualcompletion="css-img" aria-label="Instagram" role="img" style={{ backgroundImage: 'url("https://static.cdninstagram.com/rsrc.php/v3/yS/r/ajlEU-wEDyo.png")', backgroundPosition: '0px -52px', backgroundSize: 'auto', width: 175, height: 51, backgroundRepeat: 'no-repeat', display: 'inline-block' }} />
                    <p className='text-base text-[#737373] font-semibold'>Sign up to see photos and videos from your friends.</p>
                    <button className='flex items-center justify-center gap-x-2 w-[90%] py-2 rounded-lg px-4 bg-[#0095F6]'>
                        <Facebook_icon />
                        <span className='text-white font-semibold text-sm'>Log in with Facebook</span>
                    </button>
                    <div className='flex items-center w-full justify-between'>
                        <hr className='w-[40%] bg-[#DBDBDB]' />
                        <span className='font-semibold text-[13px] text-[#737373]'>OR</span>
                        <hr className='w-[40%] bg-[#DBDBDB]' />
                    </div>
                    <form ref={formRef} onSubmit={(e) => handleRegister(e, '1')} className='space-y-6 w-full'>
                        <div className="space-y-2">
                            <div className='border border-[#DBDBDB] relative  focus-within:border-gray-500'>
                                <input required placeholder='Mobile number or Email' type="text" name='email'
                                    className='w-full outline-none text-xs pt-[9px] pb-[7px] pl-[8px]' />
                                {
                                    emailValid && <button type='button' className='absolute right-1 top-1.5'>
                                        <AiOutlineCloseCircle className="text-red-500 text-xl" />
                                    </button>
                                }
                            </div>
                            <div className='border border-[#DBDBDB]  focus-within:border-gray-500'>
                                <input required placeholder='Full Name' type="text" name='fullname'
                                    className='w-full outline-none text-xs pt-[9px] pb-[7px] pl-[8px]' />
                            </div>
                            <div className='border relative border-[#DBDBDB]  focus-within:border-gray-500'>
                                <input onChange={showUsernameGenerateBtn} required placeholder='Username' type="text" name='username'
                                    className='w-full outline-none text-xs pt-[9px] pb-[7px] pl-[8px]' />
                                {
                                    showGenerateBtn &&
                                    <button type='button' onClick={generateUsername} className='absolute rotate-45 rounded-full top-0 right-1 h-full'>
                                        <IoMdRefresh className="text-xl text-gray-900" />
                                    </button>
                                }
                            </div>
                            <div className='border border-[#DBDBDB]  focus-within:border-gray-500'>
                                <input required placeholder='Password' type="password" name='password'
                                    className='w-full outline-none text-xs pt-[9px] pb-[7px] pl-[8px]' />
                            </div>
                        </div>
                        <button className='bg-[#7fc5f3] py-[6px] w-full rounded-lg'><span className='text-white font-semibold text-sm'>Sign up</span></button>
                    </form>
                    {
                        errorMessage.message
                        &&
                        <p className='text-red-500 text-xs text-center px-4'>
                            {errorMessage.message}
                        </p>
                    }
                </div>
            </div>
            <div className='lg:border  md:border w-full max-w-[360px] mt-5  py-[21px] gap-1 border-[#DBDBDB] flex items-center justify-center'>
                <p className='text-sm text-black'>Have an account?</p>
                <Link to={'/'} className='text-[#0095F6] font-semibold text-sm cursor-pointer'>Log in</Link>
            </div>

        </div>
    )
}

export default Register
