import React, { useState } from 'react'
import Axios from "axios";

const Register = () => {
    // ----------------------------------------------
    const isStrongPassword = (password) => {
        const hasUpperCases = /[A-Z]/.test(password);
        const hasLowerCases = /[a-z]/.test(password);
        const hasNumbers = /[0-9]/.test(password);
        const hasSpecialCharacters = /[^A-Za-z0-9]/.test(password);
    
        return (
            password.length >= 12 &&
            hasUpperCases &&
            hasLowerCases &&
            hasNumbers &&
            hasSpecialCharacters
        );
    };
    
    const isMediumPassword = (password) => {
        const hasUpperCases = /[A-Z]/.test(password);
        const hasLowerCases = /[a-z]/.test(password);
        const hasNumbers = /[0-9]/.test(password);
    
        return (
            password.length >= 8 &&
            hasUpperCases &&
            hasLowerCases &&
            hasNumbers
        );
    };

    const isWeakPassword = (password) => {
        const hasLowerCases = /[a-z]/.test(password);
        const hasNumbers = /[0-9]/.test(password);

        return (
            password.length >= 6 && 
            hasLowerCases && 
            hasNumbers
        );
    };
    
    const getPasswordStrengthFactor = (password) => {
        if (isStrongPassword(password)) {
            return 0.1;
        } else if (isMediumPassword(password)) {
            return 0.2;
        } else if (isWeakPassword(password)){
            return 0.3;
        }
    };
    
    const calculateThreshold = (userbiokey, factor) => {
        return userbiokey * factor;
    };

    // ----------------------------------------------


    const [user, setUser] = useState({
        name: "",
        username: "",
        password: "",
        userbiokey: 200,
        Threshold: null,
    })
        
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleChange = (key, e) => {
        var value = e;
        if (key !== "userbiokey" && key !== "Threshold") {
            value = e.target.value
        }

        setUser({
            ...user,
            [key]: value,
        })
    }

    const onCreateUser = async() => {
        const isDataAvailable = !!(user.name && user.username && user.password && user.userbiokey && user.Threshold)
        if (isDataAvailable) {
            Axios.post("http://localhost:4000/register", user)
            .then(res => {
                alert("successful create");
                window.location.href = "/";
            })
            .catch(err => {
                alert("Error creating user");
            });
        }
        else {
            alert("invalid input")
        };
    }

    //register function 
    const handleRegister = (e) => {
        e.preventDefault()

        if (user.password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
    // ----------------------------------------------

        const factor = getPasswordStrengthFactor(user.password);
        user.Threshold = calculateThreshold(user.userbiokey, factor);

        console.log(user.Threshold); 
        onCreateUser();
    }

    return (
        <div class="flex flex-col max-w-md px-4 py-8 rounded-lg shadow bg-gray-800 sm:px-6 md:px-8 lg:px-10">
            <div class="self-center mb-2 text-xl font-light sm:text-2xl text-black">
                Create a new account
            </div>
            <span class="justify-center text-sm text-center flex-items-center text-gray-400">
                Already have an account ?
                <a href="/" class="text-sm text-blue-500 underline hover:text-blue-700">
                    Sign in
                </a>
            </span>
            <div class="p-6 mt-8">
                <form action="#" onSubmit={handleRegister}>
                    <div class="flex flex-col mb-2">
                        <div class=" relative ">
                            <input type="text" id="create-account-name" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="name" value={user.name} onChange={e => handleChange("name", e)} placeholder="name" />
                        </div>
                    </div>
                    <div class="flex gap-4 mb-2">
                        <div class=" relative ">
                            <input type="text" id="create-account-username" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="username" value={user.username} onChange={e => handleChange("username", e)} placeholder="username" />
                        </div>

                    </div>
                    <div class="flex flex-col mb-2">
                        <div class=" relative ">
                            <input id="create-password" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="password" value={user.password} onChange={e => handleChange("password", e)} placeholder="password" />
                        </div>
                    </div>
                    <br />
                    <span class="justify-center text-sm text-center flex-items-center text-gray-400">
                        Confirm Password*
                    </span>
                    <div class="flex flex-col mb-2">
                        <div class=" relative ">
                            <input id="create-password" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="password" />
                        </div>
                    </div>
                    {/* <div class="flex flex-col mb-2">
                        <div class=" relative ">
                            <input id="create-password" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="password" value={setConfirmPassword} onChange={e => setConfirmPassword(e.target.value)}
 placeholder="password" />
                        </div>
                    </div> */}
                    <div class="flex w-full my-4">
                        <button type="submit" class="py-2 px-4  bg-black hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg " >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default Register