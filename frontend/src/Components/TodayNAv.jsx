import React from 'react'
import { logout } from '../redux/features/userSlices'
import { useDispatch, useSelector } from 'react-redux'
const TodayNAv = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user)
    return (
        <>
            <button onClick={() => { dispatch(logout()) }} className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"> Logout</button>

        </>

    )
}

export default TodayNAv
