import React, { useState } from 'react'

export const AddUsername = () => {

    const [inputValue, setInputValue] = useState('...');
    const onInputChange = (event) => {
        setInputValue(event.target.value);
        console.log(event.target.value);
        getPlayers();
    }

    const onSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                placeholder='Search username'
                value={inputValue}
                onChange={onInputChange}
            />
        </form>
    )
}

const getPlayers = () => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "req": "searchrankings",
        "offset": 15,
        "limit": 15,
        "gameid": "sfiii3nr1",
        "byElo": true,
        "recent": true
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        mode: 'no-cors'
    };

    fetch("https://www.fightcade.com/api/", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}   
