import React from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage'
import CharacterPage from '../characterPage';


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            charVisible: true,
            error: false
        };
        this.toggleVisible = this.toggleVisible.bind(this);
        
    }

    toggleVisible() {
        this.setState({ charVisible: !this.state.charVisible });
    }

    

    componentDidCatch() {
        console.log('Error');
        this.setState({error: true});
    }

    render() {
        if(this.state.error) {
            return <ErrorMessage/>
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