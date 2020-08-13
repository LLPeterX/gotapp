import React, {useState, useEffect} from 'react';
import './itemList.css';
import Spinner from '../spinner';

const ItemList = ({onItemSelect, getData, renderItem}) => {

    const [itemList, updateList] = useState([]);

    useEffect(()=>{ // аналог componentDidMount()
        getData().then((data) => updateList(data))
    },[getData]);
    
    
    const renderItems = (arr) => {
        return arr.map((item) => {
            const id = item.id;
            const label = renderItem(item);
            return (
                <li
                    className="list-group-item"
                    key={id}
                    onClick={() => onItemSelect(id)}
                >
                    {label}
                </li>
            )
        })
    }

    if(!itemList) {
        return <Spinner />
    }
    return (
        <ul className="item-list list-group">
            {renderItems(itemList)}
        </ul>
    );
} // ItemList

export default ItemList;