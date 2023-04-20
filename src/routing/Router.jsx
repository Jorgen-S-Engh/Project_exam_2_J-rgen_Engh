import {Routes, Route} from "react-router-dom"
import Layout from "../Layout"
import Home from "../pages/Home/Index"
import Login from "../pages/Login/Index"

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}/>
      <Route path="login" element={<Login/>} />
      <Route index element={<Home/>}/>
      <Route path="*" element={<div>Page not found</div>}/>
    </Routes>
    
  )
}

export default Router