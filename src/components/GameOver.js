import React from 'react';

const GameOver = (props) => {
    return (
        <div className="gameOver">
            <h2>Game Over</h2>
            <h3 className='highscore'>High Score: {props.finalScore}</h3>
            <div className='buttonContainer'>
                <button onClick={props.replay}>
                    Replay<i className="fas fa-reply" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    )
}

export default GameOver;