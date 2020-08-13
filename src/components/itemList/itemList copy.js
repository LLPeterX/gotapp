import React, { Component } from 'react';
import './itemList.css';
import Spinner from '../spinner';
import PropTypes from 'prop-types'
//import gotService from '../../services/gotService'

class ItemList extends Component {

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
        return (
            <ul className="item-list list-group">
                {this.renderItems(this.props.data)}
            </ul>
        );
    }
}

ItemList.defaultProps = {
    itemId: 1,
    onItemSelected: () => { } // "чистая" функция, которая ничего не делает
}

ItemList.propTypes = {
    onItemSelected: PropTypes.func
}

const withData = (View /*, getData */) => {

    return class extends React.Component {
        state = { data: null }

        componentDidMount() {
            const { getData } = this.props;
            getData().then(data => this.setState({ data }));
        }

        render() {
            const { data } = this.state;
            if (!data) {
                return <Spinner />
            }
            return <View {...this.props} data={data}/>
        }
    };
}
//const {getAllCharacters} = new gotService();
//export default withData(ItemList, getAllCharacters);
export default withData(ItemList);