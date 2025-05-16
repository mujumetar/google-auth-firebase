import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/authSlice'
import { getAuth, signOut } from 'firebase/auth'
import app from '../firebaseconfig'

const Navbar = () => {

    const dispatch = useDispatch()

    let auth = useSelector(state => state.auth.auth)

    const newAuth = getAuth(app)



    async function logOut() {
        await signOut(newAuth)

    }


    return (
        <div>
            <div className="shadow p-3">
                <div className="max-w-7xl mx-auto flex justify-between">
                    <h1 className="text-2xl font-bold">Showp</h1>
                    <div className='flex gap-3'>


                        <button onClick={()=> dispatch(logout())} className='py-1 px-4 bg-red-600 rounded-2xl border hover:bg-red-700'>logout</button>
                        <button className='group relative'>
                            <img className='w-10 rounded-full' src={auth.img} alt="" />
                            <div className="absolute end-0  group-hover:block z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{auth.name}</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{auth.email}</a>
                                    </li>
                                    <li>
                                        <a onClick={logOut} className="block px-4 py-2 hover:bg-red-800 bg-red-600 dark:hover:text-white">Logout </a>
                                    </li>

                                </ul>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar