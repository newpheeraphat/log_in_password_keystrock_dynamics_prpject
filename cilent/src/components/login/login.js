import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        password: "",
        userbiokey: -1
    });

    const [keyEvent, setKeyEvent] = useState({
        holdTimeArray: [], 
        typeSpeedArray: [], 
    });

    var lastKeyUpTimestamp = -1;
    var lastKeyDownTimestamp= -1;

    const handleChange = (key, e) => {
        var value = e;
        if (key !== "userbiokey") { value = e.target.value; }

        setUser({
            ...user,
            [key]: value,
        })
    }

    const handleSetKeyEvent = (key, value) => {
        setKeyEvent({
            ...keyEvent,
            [key]: value,
        })
    }

    const captureKeyEvent = (e) => {

        if (e.key.length > 1) { // special key
            if (e.key === "Backspace") {
                handleSetKeyEvent("holdTimeArray", []) // reset dwel time
                handleSetKeyEvent("typeSpeedArray", []) // reset type speed
                return;
            }
        }
        // When a keydown event occurs, it checks if there are previous keyup and keydown timestamps. If they exist, it calculates the flight time (time between the last keyup and the current keydown) and the typing speed (time between the last keydown and the current keydown) and pushes them into their respective arrays.
        // When a keyup event occurs, it checks if there is a previous keydown timestamp. If it exists, it calculates the dwell time (time between the current keydown and the current keyup) and pushes it into the dwellTimeArray.
        // The function also updates the lastKeyUpTimestamp and lastKeyDownTimestamp variables to store the timestamps of the current key events for future calculations.
        if (e.type === "keydown") {
            if (lastKeyDownTimestamp >= 0) {
                // If there is a previous keydown event
                const typespeed = e.timeStamp - lastKeyDownTimestamp;
                keyEvent.typeSpeedArray.push(typespeed)// Calculate and store typing speed
                console.log("Type Speed ", keyEvent.typeSpeedArray, "key ", e.key);
            }

            lastKeyDownTimestamp = e.timeStamp; // Update the lastKeyDownTimestamp 
        } else {
            // When a keyup event occurs
            if (lastKeyDownTimestamp >= 0) {
                // If there is a previous keydown event
                const dwel = e.timeStamp - lastKeyDownTimestamp;
                keyEvent.holdTimeArray.push(dwel)// Calculate and store dwell time
            }
            lastKeyUpTimestamp = e.timeStamp; // Update the lastKeyUpTimestamp value
            console.log("lastup ", lastKeyUpTimestamp);
            console.log("Holding ", keyEvent.holdTimeArray, "key ", e.key);
        };
    }

    useEffect(() => {
        const passwordfeild = document.getElementById('sign-in-password');

        passwordfeild.onkeydown = captureKeyEvent;
        passwordfeild.onkeyup = captureKeyEvent;

    }, []);

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
            return 0.3;
        } else if (isMediumPassword(password)) {
            return 0.2;
        } else if (isWeakPassword(password)){
            return 0.1;
        }
    };

    const handleRegister = async(e, keystrokeTime) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:4000/login", user).then((res) => {
            var user = res.data;
            alert(`Congratulation!! ${user.name}, you just log in to our website`);
            console.log("Username:", user.username);
            console.log("Biometickey:", user.userbiokey);
            console.log("Threshold:", user.Threshold);
            console.log("Lowest Range:", Math.ceil(user.userbiokey - user.Threshold).toString() + " < " + keystrokeTime);
            console.log("Highest Range:", Math.ceil(user.userbiokey + user.Threshold).toString() + " > " + keystrokeTime);
            console.log("So Keystroke Time is in the range of the Threshold!!");
            navigate.push("/");
        })
        } catch(err) {
            if (axios.isAxiosError(err)) {
                console.log({err});
                alert(err.response.data.message);
                console.log(user.userbiokey, " not match with existing biokey");
                navigate.push("/")
            }
        }
    }

    function handlelogin(e) {
        e.preventDefault()
        let sum = 0;
        let lastHoldingTime = keyEvent.holdTimeArray[keyEvent.holdTimeArray.length - 1];
        for (let i = 0; i < keyEvent.typeSpeedArray.length; i++) {
            sum += keyEvent.typeSpeedArray[i];
        }
        let length = keyEvent.typeSpeedArray.length + 1;
        let keystrokeTime = (sum / length) + lastHoldingTime;
        user.userbiokey = (sum / length) + lastHoldingTime;
        console.log("Keystroke Time: " + user.userbiokey);
        handleRegister(e, keystrokeTime)
    }

    return (
        <div className="flex flex-col w-full max-w-md p-5 shadow sm:px-6 md:px-8 lg:px-10">
            <div className="self-center my-3 text-xl text-black sm:text-2xl">
                Login To Your Account
            </div>
            <div className="mt-8">
                <form action="#" autoComplete="off" onSubmit={handlelogin} >
                    <div className="flex flex-col mb-2">
                        <div className="flex relative ">
                            <span className="rounded-l-md inline-flex items-center px-3 py-3 border-t bg-white text-gray-500 text-sm">
                                <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z">
                                    </path>
                                </svg>
                            </span>
                            <input type="text" id="sign-in-name" className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="username" value={user.username} onChange={e => handleChange('username', e)} placeholder="Your username" />
                        </div>
                    </div>
                    <div className="flex flex-col mb-6">
                        <div className="flex relative ">
                            <span className="rounded-l-md inline-flex items-center px-3 py-3 border-t bg-white text-gray-500 text-sm">
                                <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z">
                                    </path>
                                </svg>
                            </span>
                            <input  id="sign-in-password" className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="password" value={user.password} onChange={e => handleChange('password', e)} placeholder="Your password" />
                            {/* <input type="password" id="sign-in-password" class=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="password" value={user.password} onChange={captureInputEvent} placeholder="Your password" /> */}
                        </div>
                    </div>
                    <div className="flex w-full my-2 ">
                        <button type="submit" className="py-2 px-4  bg-dark hover-overlay focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                            Login
                        </button>
                    </div>
                </form>
            </div>
            <div className="flex items-center justify-center mt-6">
                <a href="/register" className="inline-flex items-center text-xs font-thin text-center text-gray-100 hover:text-white">
                    <span className="ml-2">
                        You don&#x27;t have an account?
                    </span>
                </a>
            </div>
        </div>
    )
}
export default Login