import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/" element={<Login/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
