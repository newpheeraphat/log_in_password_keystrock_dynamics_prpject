import React, { useState, useEffect } from 'react'
import Axios from "axios";

const Register = () => {


    const [keyEvent, setKeyEvent] = useState({
        holdTimeArray: [],
        typeSpeedArray: []
    });

    const [keyEventConfirm, setKeyEventConfirm] = useState({
        holdTimeArray: [],
        typeSpeedArray: []
    });

    var lastKeyUpTimestamp = -1;
    var lastKeyDownTimestamp= -1;

    const handleChange = (key, e) => {
        var value = e;
        if (key !== "userbiokey" && key !== "Threshold") {
            value = e.target.value
        }

        setUser({
            ...user,
            [key]: value,
        })
    };

    const handleSetKeyEvent = (key, value) => {
        setKeyEvent({
            ...keyEvent,
            [key]: value,
        })
    };

    const handleSetKeyEventConfirm = (key, value) => {
        setKeyEventConfirm({
            ...keyEventConfirm,
            [key]: value,
        })
    };

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

    const captureKeyEventConfirm = (e) => {

        if (e.key.length > 1) { // special key
            if (e.key === "Backspace") {
                handleSetKeyEventConfirm("holdTimeArray", []) // reset dwel time
                handleSetKeyEventConfirm("typeSpeedArray", []) // reset type speed
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
                keyEventConfirm.typeSpeedArray.push(typespeed)// Calculate and store typing speed
                console.log("Type Speed ", keyEventConfirm.typeSpeedArray, "key ", e.key);
            }

            lastKeyDownTimestamp = e.timeStamp; // Update the lastKeyDownTimestamp 
        } else {
            // When a keyup event occurs
            if (lastKeyDownTimestamp >= 0) {
                // If there is a previous keydown event
                const dwel = e.timeStamp - lastKeyDownTimestamp;
                keyEventConfirm.holdTimeArray.push(dwel)// Calculate and store dwell time
            }
            lastKeyUpTimestamp = e.timeStamp; // Update the lastKeyUpTimestamp value
            console.log("lastup ", lastKeyUpTimestamp);
            console.log("Holding ", keyEventConfirm.holdTimeArray, "key ", e.key);
        };
    }

    useEffect(() => {
        const passwordfield = document.getElementById('create-password');
        const confirmationpasswordfield = document.getElementById('confirmation-create-password');

        passwordfield.onkeydown = captureKeyEvent;
        passwordfield.onkeyup = captureKeyEvent;
        confirmationpasswordfield.onkeydown = captureKeyEventConfirm;
        confirmationpasswordfield.onkeyup = captureKeyEventConfirm;
    });

    


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
            return 0.3;
        } else if (isMediumPassword(password)) {
            return 0.2;
        } else if (isWeakPassword(password)){
            return 0.1;
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
        userbiokey: null,
        Threshold: null,
    })
        
    const [confirmPassword, setConfirmPassword] = useState("");

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
            alert("invalid input");
        };
    }

    const KeyStrokeTime = (holdTimeArray, typeSpeedArray) => {
        let sum = 0;
        let lastHoldingTime = holdTimeArray[holdTimeArray.length - 1];
        for (let i = 0; i < typeSpeedArray.length; i++) {
            sum += typeSpeedArray[i];
        }
        let length = typeSpeedArray.length + 1;
        let result = (sum / length) + lastHoldingTime;
        return result;
    }

    const avgKeyStrokeTime = (first, second) => {
        return (first + second) / 2; 
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
        const firstKST = KeyStrokeTime(keyEvent.holdTimeArray, keyEvent.typeSpeedArray);
        const secondKST = KeyStrokeTime(keyEventConfirm.holdTimeArray, keyEventConfirm.typeSpeedArray);
        user.userbiokey = avgKeyStrokeTime(firstKST, secondKST);
        user.Threshold = calculateThreshold(user.userbiokey, factor);

        // Display 
        console.log("Username:", user.username);
        console.log("First KST:", firstKST);
        console.log("Second KST:", secondKST);
        console.log("Average of KST | Biometickey: ", user.userbiokey);
        console.log("Threshold:", user.Threshold); 
        onCreateUser();
    }


    return (
        <div className="flex flex-col max-w-md px-4 py-8 rounded-lg shadow bg-gray-800 sm:px-6 md:px-8 lg:px-10">
            <div className="self-center mb-2 text-xl font-light sm:text-2xl text-black">
                Create a new account
            </div>
            <span className="justify-center text-sm text-center flex-items-center text-gray-400">
                Already have an account ?
                <a href="/" className="text-sm text-blue-500 underline hover:text-blue-700">
                    Sign in
                </a>
            </span>
            <div className="p-6 mt-8">
                <form action="#" onSubmit={handleRegister}>
                    <div className="flex flex-col mb-2">
                        <div className=" relative ">
                            <input type="text" id="create-account-name" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="name" value={user.name} onChange={e => handleChange("name", e)} placeholder="name" />
                        </div>
                    </div>
                    <div className="flex gap-4 mb-2">
                        <div className=" relative ">
                            <input type="text" id="create-account-username" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="username" value={user.username} onChange={e => handleChange("username", e)} placeholder="username" />
                        </div>

                    </div>
                    <div className="flex flex-col mb-2">
                        <div className=" relative ">
                            <input id="create-password" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="password" value={user.password} onChange={e => handleChange("password", e)} placeholder="password" />
                        </div>
                    </div>
                    <br />
                    <span className="justify-center text-sm text-center flex-items-center text-gray-400">
                        Confirm Password*
                    </span>
                    <div className="flex flex-col mb-2">
                        <div className=" relative ">
                            <input id="confirmation-create-password" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="password" />
                        </div>
                    </div>
                    {/* <div className="flex flex-col mb-2">
                        <div className=" relative ">
                            <input id="create-password" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="password" value={setConfirmPassword} onChange={e => setConfirmPassword(e.target.value)}
 placeholder="password" />
                        </div>
                    </div> */}
                    <div className="flex w-full my-4">
                        <button type="submit" className="py-2 px-4  bg-black hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg " >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default Register