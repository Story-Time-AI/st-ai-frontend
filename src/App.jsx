import { useState } from 'react'
import { FaUser } from 'react-icons/fa';
import Input from './components/Form/Input.jsx';
import Login from './pages/Auth/Login.jsx';
import SignUp from './pages/Auth/Signup.jsx';


function App() {
  const [username, setUsername] = useState("")

  return (
    <div data-theme="dark " className="">

<Login />
  </div>
  )
}

export default App
