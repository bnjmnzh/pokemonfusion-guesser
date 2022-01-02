import React from 'react';
import './styles.css';
import Game from './components/Game';
import Landing from './components/Landing';
import GameOver from './components/GameOver';

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      gameState: <Landing
        startGame={this.startGame}
      />,
      counter: 0,
      showButton: false,
    }
  }

  startGame = () => {
    this.setState({
      gameState: <Game
        endGame={this.endGame}
        setScore={this.setScore}
      />,
      counter: 0
    })
  }

  endGame = () => {
    this.setState({
      gameState: <GameOver
        finalScore={this.state.counter}
        replay={this.startGame}
      />
    })
  }

  setScore = (score) => { this.setState({ counter: score }) }

  render () {
    return (
      <div className="App">
        <h1>Pokemon Fusion Guesser</h1>
        { this.state.gameState }
        <footer>
          <p>Code and design by <a href="https://bnjmnzh.github.io/personal-website/" target="_blank" rel="noopener noreferrer">Benjamin Zhuo</a>. Images taken from <a href="https://pokemon.alexonsager.net/" target="_blank" rel="noopener noreferrer">Alex Onsager</a>.</p>
        </footer>
      </div>
    );
  }
}

export default App;
