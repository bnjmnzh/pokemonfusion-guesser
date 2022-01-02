import React from 'react';

const Landing = (props) => {
    return (
        <div className='landing' >
            <div className="landingText">
                <p>Enter the names of the two Pokemon that make this fusion.</p>
                <p>Order does not matter!</p>
            </div>
            <div className="buttonContainer">
                <button onClick={props.startGame}>New Game</button>
            </div>
        </div>
    )
}

export default Landing;