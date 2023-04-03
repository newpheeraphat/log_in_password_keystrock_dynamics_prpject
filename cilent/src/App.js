import React from 'react'
import Quotes from './components/quotes/Quotes'
import Login from "./components/login/login"
import Register from "./components/register/register"

// This is a React Router v6 app
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {

  return (
    <div>
      <div className="App" style={{backgroundColor: "antiquewhite"}}>
        <div className="bg-lightslategray h-screen">
          <div className="container mx-auto h-full flex justify-center items-center">
            <BrowserRouter>
              <Routes>
                <Route exact path="/" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App