
const EmailVerification = () => {
    return <div className='flex flex-col items-center p-2.5 justify-center w-full'>
        <div className=' w-full flex flex-col justify-center items-center  text-center gap-y-2'>
            <div className=' bg-no-repeat bg-position  w-[92px] h-[72px] bg-[url(https://static.cdninstagram.com/rsrc.php/v3/y8/r/ZWR9C7_JdnP.png)]'>
            </div>
        </div>
        <div className='flex flex-col text-center justify-center items-center gap-y-5'>
            <h6 className='font-semibold text-sm'>Enter Confirmation Code</h6>
            <p className='text-sm text-center'>Enter the confirmation code we sent to sharifabduraxmonov@mail.ru.</p>
            <div className='border border-[#DBDBDB] w-[98%] rounded-md focus-within:border-gray-500 '>
                <input required placeholder='Confirmation Code' type="text" name='email'
                    className='w-full outline-none bg-[#FAFAFA] text-sm pt-[9px] pb-[7px] pl-[8px] rounded-md' />
            </div>
            <button type='button' role='button' className='bg-[#7fc5f3] py-[6px] w-full rounded-lg'><span className='text-white font-semibold text-sm'>Next</span></button>
            <button type='button' role='button' className='text-[#0095F6] text-sm font-semibold'>Go Back</button>
        </div>
    </div>
}

export default EmailVerification
