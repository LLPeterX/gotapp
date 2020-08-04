import React, { Component } from 'react';
import './itemList.css';
import gotService from '../../services/gotService';
import Spinner from '../spinner';

export default class ItemList extends Component {

    gotService = new gotService(); // новый синтаксис ES - без конструктора
    state = { charList: null } // но далее при вызовах всё равно нужен this

    componentDidMount() {
        this.gotService.getAllCharacters().then(charList => this.setState({ charList }));
    }

    renderItems(arr) {
        return arr.map((char, i) => { // i нужен для key; не самый хороший способ
            const id=this.gotService.getIdFromURL(char.url);
            return (
                <li
                    className="list-group-item"
                    key={id}
                    onClick={()=>this.props.onCharSelect(id)}
                >
                    {char.name}
                </li>
            )
        })
    }

    render() {
        const { charList } = this.state;
        if (!charList) {
            return <Spinner />
        }
        return (
            <ul className="item-list list-group">
                {this.renderItems(charList)}
            </ul>
        );
    }
}