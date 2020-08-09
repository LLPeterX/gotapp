import React, { Component } from 'react';
import './itemDetails.css';
import gotService from '../../services/gotService';

export const Field = ({ item, field, label }) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    );
}

export default class ItemDetails extends Component {
    gotService = new gotService();
    state = { item: null };

    updateItem() {
        const itemId = this.props.itemId;
        if (!itemId) {
            return;
        }
        this.gotService.getCharacter(itemId)
            .then(item => this.setState({ item }));
    }
    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.itemId !== this.props.itemId) {
            this.updateItem();
        }
    }

    render() {
        if (!this.state.item) {
            return <span className="select-error">Please select a item</span>;
        }
        const { item } = this.state
        const { name } = item;
        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, { item });
                        })
                    }
                </ul>
            </div>
        );
    }
}