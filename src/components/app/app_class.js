import React from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage'
import gotService from '../../services/gotService'
import {BooksPage, HousesPage, CharacterPage, BooksItem} from '../pages';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './app.css'


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            charVisible: true,
            error: false
        };
        this.toggleVisible = this.toggleVisible.bind(this);
        this.gotService = new gotService();
    }

    toggleVisible() {
        this.setState({ charVisible: !this.state.charVisible });
    }

    componentDidCatch() {
        console.log('Error');
        this.setState({ error: true });
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />
        }
        return (
            <Router>
                <div className="app"> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        {this.state.charVisible ? <RandomCharBlock /> : null}
                        <Row>
                            <button onClick={this.toggleVisible}>Toggle Random Character</button>
                        </Row>
                        <Route exact path="/" component={CharacterPage} />
                        <Route exact path="/characters" component={CharacterPage} />
                        <Route exact path="/houses" component={HousesPage} />
                        <Route exact path="/books" component={BooksPage} />
                        <Route path="/books/:id" render={({match}) => {
                            const id = match.params.id;
                            return <BooksItem bookId={id}/>
                        }
                        } />


                    </Container>
                </div>
            </Router>
        );
    }
}

const RandomCharBlock = () => {
    return (
        <Row>
            <Col lg={{ size: 5, offset: 0 }}>
                <RandomChar interval={20000}/>
            </Col>
        </Row>

    );

}

export default App;