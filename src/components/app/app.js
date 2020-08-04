import React from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';


class App extends React.Component {
    constructor() {
        super();
        this.state = {charVisible: true};
        this.toggleVisible = this.toggleVisible.bind(this);
    }
    
    toggleVisible() {
        this.setState({charVisible: !this.state.charVisible});
    }

    render() {
        const visible = this.state.charVisible;
        console.log('Visible: '+visible);
        return (
            <>
                <Container>
                    <Header />
                </Container>
                <Container>
                    {this.state.charVisible ? <RandomCharBlock/> : null}
                    <Row>
                        <button onClick={this.toggleVisible}>Toggle Random Character</button>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <CharDetails />
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