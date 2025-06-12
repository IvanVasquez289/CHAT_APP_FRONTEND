import Navbar from "./components/Navbar"
import {Routes, Route} from 'react-router-dom'
import HomePage from "./pages/HomePage"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import SettingsPage from "./pages/SettingsPage"
import ProfilePage from "./pages/ProfilePage"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
const App = () => {
  const {checkAuth} = useAuthStore()

  useEffect(()=>{
    checkAuth()
  },[checkAuth])
  
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/settings" element={<SettingsPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
      </Routes>
    </div>
  )
}

export default App