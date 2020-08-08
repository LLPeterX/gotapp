import React from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage'
import CharacterPage from '../characterPage';
import ItemList from '../itemList';
import gotService from '../../services/gotService'
import CharDetails from '../charDetails'


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
            <>
                <Container>
                    <Header />
                </Container>
                <Container>
                    {this.state.charVisible ? <RandomCharBlock /> : null}
                    <Row>
                        <button onClick={this.toggleVisible}>Toggle Random Character</button>
                    </Row>
                    <CharacterPage />
                    <Row>
                        <Col md="6">
                            <ItemList onItemSelect={this.onCharSelect} getData={this.gotService.getAllBooks} 
                            renderItem={(item)=>(`<><span>${item.name} (${item.released})</span> <button>Click Me</button></>`)}/>
                        </Col>
                        <Col md="6">
                            <CharDetails charId={this.state.selectedChar} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <ItemList onItemSelect={this.onCharSelect} getData={this.gotService.getAllHouses} 
                            renderItem={(item) => `${item.name} - ${item.region}`}/>
                        </Col>
                        <Col md="6">
                            <CharDetails charId={this.state.selectedChar} />
                        </Col>

                    </Row>
                </Container>
            </>
        );
    }
}

const RandomCharBlock = () => {
    return (
        <Row>
            <Col lg={{ size: 5, offset: 0 }}>
                <RandomChar />
            </Col>
        </Row>

    );

}

export default App;