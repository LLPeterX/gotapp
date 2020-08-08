import React from 'react'
import { Col, Row } from 'reactstrap';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ErrorMessage from '../errorMessage'
import gotService from '../../services/gotService'

export default class CharacterPage extends React.Component {
  state = { selectedChar: 130, error: false };
  gotService = new gotService();

  onCharSelect = (id) => {
    console.log('set id to', id);
    this.setState({ selectedChar: id });
  }

  componentDidCatch() {
    this.setState({error: true});

  }
  render() {
    if(this.state.error) {
      return <ErrorMessage/>
    }
    return (
      <Row>
        <Col md='6'>
          <ItemList 
            onItemSelect={this.onCharSelect} 
            getData={this.gotService.getAllCharacters}
            renderItem={(item)=>`${item.name} (${item.gender})`}
            />
        </Col>
        <Col md='6'>
          <CharDetails charId={this.state.selectedChar} />
        </Col>
      </Row>
    );
  }
}