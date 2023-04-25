import React from 'react'
import Login from "./components/login/login"
import Register from "./components/register/register"

// This is a React Router v6 app
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {

  return (
    <div>
      <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
      integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
      crossorigin="anonymous"
      />
      <div className="App" style={{backgroundColor: "white"}}>
        <div className="bg-lightslategray min-vh-100 min-vw-100 d-flex align-items-center justify-content-center">
          <div className="container mx-auto d-flex align-items-center justify-content-center border-radius">
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