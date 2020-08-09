import React, { Component } from 'react';
import './itemList.css';
import Spinner from '../spinner';

export default class ItemList extends Component {

    state = { itemList: null }

    componentDidMount() {
        const { getData } = this.props;
        getData().then(itemList => this.setState({ itemList }));
    }

    renderItems(arr) {
        return arr.map((item) => {
            const id = item.id;
            const label = this.props.renderItem(item);
            return (
                <li
                    className="list-group-item"
                    key={id}
                    onClick={() => this.props.onItemSelect(id)}
                >
                    {label}
                </li>
            )
        })
    }

    render() {
        const { itemList } = this.state;
        if (!itemList) {
            return <Spinner />
        }
        return (
            <ul className="item-list list-group">
                {this.renderItems(itemList)}
            </ul>
        );
    }
}