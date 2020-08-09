import React, { Component } from 'react';
import './charDetails.css';
import gotService from '../../services/gotService';

export const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
        <span className="term">{label}</span>
        <span>{item[field]}</span>
        {/* <span>{field}</span> */}
    </li>

    );
}

export default class CharDetails extends Component {
    gotService = new gotService();
    state = { item: null };

    updateChar() {
        const charId = this.props.charId;
        if (!charId) {
            return;
        }
        this.gotService.getCharacter(charId)
            .then(item => this.setState({ item }));
    }
    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        console.log('details props:', this.props);
        if (prevProps.charId !== this.props.charId) {
            this.updateChar();
        }
    }

    render() {
        if (!this.state.item) {
            return <span className="select-error">Please select a item</span>;
        }
        const {item}  = this.state
        const {name}  = item;
        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {/* <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born</span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died</span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture</span>
                        <span>{culture}</span>
                    </li> */}
                    {
                        React.Children.map(this.props.children,(child) => {
                            return React.cloneElement(child, {item});
                        })
                    }
                </ul>
            </div>
        );
    }
}