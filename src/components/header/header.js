import React from 'react';
import {Link} from 'react-router-dom'
import './header.css';

const Header = () => {
    return (
        <div className="headerBlock">
            <div className="headerTitle">
                <Link to="/">
                Game of Thrones DB
                </Link>
            </div>
            <ul className="headerLinks">
                <li>
                <Link to="/characters">Персонажи</Link>
                </li>
                <li>
                    <Link to="/houses">Дома</Link>
                </li>
                <li>
                    <Link to="/books">Книги</Link>   
                </li>
            </ul>
        </div>
    );
};

export default Header;