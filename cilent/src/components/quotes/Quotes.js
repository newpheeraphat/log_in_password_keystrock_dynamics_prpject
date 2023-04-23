import React, { useState } from 'react';
import axios from 'axios';

function Quotes() {

    const [text, setText] = useState("");
    const [author, setAuthor] = useState("");

    function getQuote() {
        axios.get('http://localhost:4000/', { crossdomain : true })
            .then(response => {
                setText(response.data.text);
                setAuthor(response.data.author);
            })
    }

    // function notes() 
    // {
    //     if (user.password.length > 7 && user.password.length < 11){ //8-10
    //         user.Threshold = 20;
    //     } else if (user.password.length > 10 && user.password.length < 21){ //11-20
    //         console.log("here");
    //         user.Threshold = 30;
    //     } else if (user.password.length > 20 && user.password.length < 31){ //21-30
    //         user.Threshold = 40;
    //     }
    // }

    return (
        <div>
            <button onClick={getQuote}>
                Generate Quotes
            </button>
            <h1>{text}</h1>
            <h3>{'-' + author}</h3>
        </div>
    )
}

export default Quotes