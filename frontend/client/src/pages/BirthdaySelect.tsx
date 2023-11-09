import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { goBack, setRegisterState } from '../redux/reducers/register.reducer';
const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
];
const BirthdaySelect = () => {
    const registerState = useSelector((state: RootState) => state.register);
    const dispatch = useDispatch();
    const currentYear = new Date().getFullYear();
    const startYear = 1920;
    const endYear = 2098;
    const [selectedMonth, setSelectedMonth] = React.useState("January");
    const [selectedYear, setSelectedYear] = React.useState(currentYear);
    const [selectedDay, setSelectedDay] = React.useState(1);
    // Function to get the number of days in a selected month
    const getDaysInMonth = (year: number, month: string) => {
        return new Date(year, months.indexOf(month) + 1, 0).getDate();
    };

    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const lastRegisterTab = (e: React.SyntheticEvent) => {
        e.preventDefault();
        let birthdayDate = selectedMonth + " " + selectedDay + "," + selectedYear
        dispatch(setRegisterState({
            tab_index: 2, user: {
                ...registerState.user,
                birthday: birthdayDate
            }
        }))
    }
    const goBackPage = () => {
        dispatch(goBack())
    }
    return (
        <div className='lg:border md:border py-6 border-[#DBDBDB] max-w-[360px] flex flex-col items-center px-6'>
            <form onSubmit={lastRegisterTab} className='flex flex-col items-center p-2.5 justify-center w-full'>
                <div className='text-center w-full flex flex-col items-center gap-y-3'>
                    <div className='w-[144px] h-24 bg-[url(https://static.cdninstagram.com/rsrc.php/v3/y8/r/ZWR9C7_JdnP.png)]'>
                    </div>
                    <h6 className='font-semibold text-sm'>Add Your Birthday</h6>
                    <p className='text-sm'>This won't be a part of your public profile.</p>
                </div>
                <div className='flex items-center justify-center gap-x-1 mt-2 w-full'>
                    <select
                        className='border border-[#DBDBDB] pr-2 pl-3 py-1.5 rounded-sm  text-xs outline-none text-[#737373] '
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                        {months.map((month) => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                    <select className='border border-[#DBDBDB] pr-2 pl-3  rounded-sm py-1.5 text-xs outline-none text-[#737373]'
                        value={selectedDay}
                        onChange={(e) => setSelectedDay(parseInt(e.target.value))}
                    >
                        {days.map((day) => (
                            <option key={day} value={day}>
                                {day}
                            </option>
                        ))}
                    </select>
                    <select className='border border-[#DBDBDB] pr-2 pl-3  rounded-sm py-1.5 text-xs outline-none text-[#737373]'
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    >
                        {Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i).map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='text-center space-y-5 mt-3'>
                    <p className='text-[#737373] text-xs'>You need to enter the date you were born</p>
                    <p className='text-[#737373] text-xs'>Use your own birthday, even if this account is for a business, a pet, or something else
                    </p>
                    <button type='submit' role='button' className='bg-[#0095F6] py-[6px] w-full rounded-lg'><span className='text-white font-semibold text-sm'>Next</span></button>
                    <button type='button' role='button' className='text-[#0095F6] text-sm font-semibold' onClick={goBackPage}>Go Back</button>
                </div>
            </form>
        </div>

    );
}

export default BirthdaySelect
