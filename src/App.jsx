import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import Login from './components/Login'
import Navbar from './components/Navbar'





function App() {
  let auth = useSelector(state => state.auth.auth)

  console.log(auth)


  return (

    <>
      {auth && <Navbar />}
      {!auth && <Login />}

    </>
  )
}

export default App