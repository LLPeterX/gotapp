import React, { useEffect } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
//import ErrorMessage from '../errorMessage'
//import gotService from '../../services/gotService'
import { BooksPage, HousesPage, CharacterPage, BooksItem } from '../pages';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useState } from 'react'

import './app.css'




const App = () => {
    const [charVisible, setCharVisible] = useState(true);
    const [error, setError] = useState(false);
    const [data, refreshData] = useState([{name: "Иван", age:33}]);
    refreshData((data) => ([...data, {name:"Вася", age:22}]));
    //const gotService = new gotService();
    useEffect(()=> {
        updateChar();
        let timerId=setInterval(updateChar,15000);
        return () => {
            clearInterval(timerId);
        }
    })

    useEffect(()=> {
        document.title=`GotApp ${charVisible}`;
    })

    const toggleVisible = () => {
        setCharVisible(!charVisible);
    }

    // componentDidCatch() {
    //     console.log('Error');
    //     this.setState({ error: true });
    // }

    return (
        <Router>
            <div className="app">
                <Container>
                    <Header />
                </Container>
                <Container>
                    {charVisible ? <RandomCharBlock /> : null}
                    <Row>
                        <button onClick={toggleVisible}>Toggle Random Character</button>
                    </Row>
                    <Route exact path="/" component={CharacterPage} />
                    <Route exact path="/characters" component={CharacterPage} />
                    <Route exact path="/houses" component={HousesPage} />
                    <Route exact path="/books" component={BooksPage} />
                    <Route path="/books/:id" render={({ match }) => {
                        const id = match.params.id;
                        return <BooksItem bookId={id} />
                    }
                    } />


                </Container>
            </div>
        </Router>
    );

}

const RandomCharBlock = () => {
    return (
        <Row>
            <Col lg={{ size: 5, offset: 0 }}>
                <RandomChar interval={20000} />
            </Col>
        </Row>

    );

}

export default App;