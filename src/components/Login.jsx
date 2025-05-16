import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { login, logout } from '../features/authSlice'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, setPersistence, browserLocalPersistence } from 'firebase/auth';

import { ToastContainer, toast } from 'react-toastify';
import app from '../firebaseconfig';



const Login = () => {


    const provider = new GoogleAuthProvider(app)


    const auth = getAuth(app)
    const [formdata, setFormData] = useState({ name: "", img: "", email: "", password: "" })
    const [logdata, setLogData] = useState({ email: "", password: "" })

    const dispatch = useDispatch()

    function handleForm(e) {
        // console.log(e.target.name)
        // console.log(e.target.value)
        const { name, value } = e.target;

        setFormData({
            ...formdata,
            [name]: value
        })

        setLogData({
            ...logdata,
            [name]: value
        })

    }


    const handleGoogles = async () => {
        let res = await signInWithPopup(auth, provider)
        let cUser = auth.currentUser;
        toast.success("Sign UP successfull...!")
    }


    useEffect(() => {


        setPersistence(auth, browserLocalPersistence)
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(login({ name: user.displayName, email: user.email, img: user.photoURL }))
            }
            else {
                dispatch(logout())
            }
        })


    }, [auth])

    async function handleReg() {

        try {

            const res = await createUserWithEmailAndPassword(auth, formdata.email, formdata.password)
            const users = res.user



        } catch (error) {
            console.log(error.code)
            console.log(error.message)
            toast.error(error.message)
        }



    }

    async function handleLog() {

        try {
            const res = await signInWithEmailAndPassword(auth, formdata.email, formdata.password)
            const users = res.user

            console.log(auth.currentUser)
            toast.success("login successfull...!")
            if (users) {
                console.log(users)
                dispatch(login({ username: users.displayName, email: users.email, key: users.key }))
            }
        } catch (error) {
            console.log(error.code)
            console.log(error.message)
            toast.error(error.code)
        }


    }

    return (
        <div>
            <div className="w-md p-5  fixed top-1/2 start-1/2 -translate-y-1/2 -translate-x-1/2">
                <section className="bg-gray-50 my-5 ">
                    <div className="flex flex-col items-center justify-center px-6 py-1 mx-auto md:h-screen lg:py-0 my-5 ">

                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Create an account
                                </h1>
                                <div className="space-y-4 md:space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                        <input type="name" placeholder='name' name="name" onChange={handleForm} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">image</label>
                                        <input type="text" placeholder='img' name="img" onChange={handleForm} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    </div>
                                    <div>
                                        <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">email</label>
                                        <input type="email" placeholder='email' name="email" onChange={handleForm} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">image</label>
                                        <input type="password" placeholder='password' name="password" onChange={handleForm} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={handleReg}>Create an account</button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                                    </p>
                                </div>
                            </div>
                        </div>


                        <div id="hidden">
                            <div className="flex flex-col gap-7 border p-5">
                                Login
                                <input type="text" placeholder='email' name="email" onChange={handleForm} className='border p-3 text-xl' />
                                <input type="text" placeholder='password' name="password" onChange={handleForm} className='border p-3 text-xl' />

                                <button onClick={handleLog} className='rounded py-1 px-4 bg-green-600'>Login</button>
                            </div>
                            <div className='flex justify-around'>
                                <button onClick={() => handleGoogles()} className='shadow rounded-full bg-slate-100 hover:bg-slate-300 overflow-hidden '><img className='w-[40px]' src="https://cdn-icons-png.flaticon.com/128/300/300221.png" alt="" /></button>

                            </div>
                        </div>
                    </div>
                </section>
                <br></br>
            </div>

            <ToastContainer />
        </div>
    )
}

export default Login