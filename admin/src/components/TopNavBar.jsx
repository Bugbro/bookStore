import { useDispatch } from 'react-redux'
import { adminLogoutThunk } from '../redux/features/authSlice.js'

export const TopNavBar = () => {

    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(adminLogoutThunk())
    }

    return (
        <div>

            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
                Logout
            </button>
        </div>
    )
}