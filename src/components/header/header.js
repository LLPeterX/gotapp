import React from 'react';
import './header.css';
//import styled from 'styled-components';

const Header = () => {
    return (
        <div className="headerBlock">
            <div className="headerTitle">
                <a href="#">
                Game of Thrones DB
                </a>
            </div>
            <ul className="headerLinks">
                <li>
                    <a href="#">Персонажи</a>
                </li>
                <li>
                    <a href="#">Дома</a>
                </li>
                <li>
                    <a href="#">Книги</a>   
                </li>
            </ul>
        </div>
    );
};

export default Header;