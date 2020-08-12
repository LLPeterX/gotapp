import React, { Component } from 'react';
import './randomChar.css';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage'
import PropTypes from 'prop-types'

export default class RandomChar extends Component {
    constructor() {
        super();
        this.state = {
            char: {},
            isLoading: true,
            isError: false
        };
        this.timerId=null;
        this.gotService = new gotService();
        this.updateCharacter = this.updateCharacter.bind(this);
    }

    static defaultProps = {
        interval: 10000
    }

    onCharLoaded = (char) => {
        this.setState({ char, isLoading: false });
    }

    updateCharacter() {
        const id = Math.floor(Math.random() * 140 + 25);
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    onError = (err) => {
        this.setState({ isError: true, isLoading: false });
    }

    componentDidMount() {
        this.updateCharacter();
        this.timerId = setInterval(this.updateCharacter,this.props.interval);
    }

    componentWillUnmount() {
        if(this.timerId!=null) {
            clearInterval(this.timerId);
        }
    }


    render() {
        const { char, isLoading, isError } = this.state;
        return (
            <div className="random-block rounded">
                {isError ? <ErrorMessage /> : isLoading ? <Spinner /> : <View char={char} />}

            </div>
        );
    }
}

// RandomChar.propTypes = {
//     interval: (props, propName, componenName) => {
//         const propValue = props[propName];
//         if(typeof propValue === 'number' && !isNaN(propValue)) {
//             return null; // check OK
//         }
//         return new TypeError(`${componenName}: ${propName} must be a number`);
//     }
// }

RandomChar.propTypes = {
    interval: PropTypes.number
}

const View = ({ char }) => {
    const { name, gender, born, died, culture } = char;
    return (
        <>
            <h4>Случайный персонаж: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    );
}


