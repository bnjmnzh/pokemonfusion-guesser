import { Component } from 'react';
import { Input, Form } from './styles';
import pokemon from './pokemon';
import '../styles.css';

// Returns random number between min and max (both included)
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

class Game extends Component {
    constructor() {
        super();
        this.state = {
            images: [],
            answers: [],
            gameCounter: 0,
            score: 0,
            plusOne: false,
            timer: 60,
            userInput1: "",
            userInput2: ""
        }
    }

    componentDidMount() {
        this.getPokemonImages();
        this.startTimer();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
     }

    startTimer = () => {
        this.interval = setInterval(() => {
            // Update the countdown every second
            this.setState({ timer: this.state.timer - 1 });
            // endGame will remove the Game component from the DOM 
            if (this.state.timer === 0) {
                this.props.endGame();
            }
        }, 1000);
    }

    handleUserInput1 = (e) => {
        const input = e.target.value.trim().toLowerCase();
        this.setState({ userInput1: input });
    }

    handleUserInput2 = (e) => {
        const input = e.target.value.trim().toLowerCase();
        this.setState({ userInput2: input });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.validateAnswer();
    }

    validateAnswer = () => {
        if ([this.state.userInput1, this.state.userInput2].sort().join(',') === this.state.answers[this.state.gameCounter].sort().join(',')) {
            this.setState({ gameCounter: this.state.gameCounter + 1 });
            this.setState({ score: this.state.score + 1 });
            this.setState({
                userInput1: "",
                userInput2: ""
            })
            this.props.setScore(this.state.score);
        } else {
            console.log(this.state.answers[this.state.gameCounter]);
        }
    }

    handleSkip = () => {
        this.setState({ gameCounter: this.state.gameCounter + 1 });
    }

    // Populate list of images to use
    getPokemonImages = () => {
        let imagesList = [];
        let answersList = [];

        for (let i = 0; i < 60; i++) {
            // Generate two random numbers
            let num1 = randomNumber(1, 151);
            let num2 = randomNumber(1, 151);

            // Some pokemon are not supported
            while (!(num1 in pokemon)) {
                num1 = randomNumber(1, 151);
            }
            while (!(num2 in pokemon)) {
                num2 = randomNumber(1, 151);
            }

            // So that the two numbres are different
            while (num1 === num2) {
                num2 = randomNumber(1, 151);
            }


            let url = `https://images.alexonsager.net/pokemon/fused/${num1}/${num1}.${num2}.png`;
            let answers = [pokemon[num1].toLowerCase(), pokemon[num2].toLowerCase()];
            answersList.push(answers);
            imagesList.push(url);
        }

        this.setState({images: imagesList});
        this.setState({answers: answersList});
    }

    animateScore = () => {
        this.setState({ plusOne: !this.state.plusOne });
    }

    render() {
        return (
            <div className="game">
                <div className="counterBar">
                    <div className="score">
                        <span>Score: {this.state.score}</span>
                    </div>
                    <div className="timer" aria-label="Timer">
                        <span>Time: {this.state.timer}</span>
                    </div>
                </div>

                <div className="imageContainer">
                    <img className="pokemonImage" src={this.state.images[this.state.gameCounter]} alt="Pokefusion" />
                </div>

                <div className="pokemonContainer">
                    <Form onSubmit={this.handleSubmit}>
                        <div className='inputs'>
                            <Input type="text" id="word1" value={this.state.userInput1} onChange={this.handleUserInput1} />
                            <Input type="text" id="word2" value={this.state.userInput2} onChange={this.handleUserInput2} />
                        </div>
                        <div className="buttons">
                            <button id="skip" type="button" onClick={this.handleSkip}>Skip</button>
                            <input id="submit" type="submit" value="Submit" />
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Game;