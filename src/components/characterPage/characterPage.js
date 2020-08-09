import React from 'react'
import ItemList from '../itemList';
import CharDetails, {Field} from '../charDetails';
import ErrorMessage from '../errorMessage'
import gotService from '../../services/gotService'
import RowBlock from '../rowBlock'

export default class CharacterPage extends React.Component {
  state = { selectedItem: 130, error: false };
  gotService = new gotService();

  onItemSelect = (id) => {
    this.setState({ selectedItem: id });
  }

  componentDidCatch() {
    this.setState({ error: true });
  }



  render() {
    if (this.state.error) {
      return <ErrorMessage />
    }
    const itemList = (
      <ItemList
        onItemSelect={this.onItemSelect}
        getData={this.gotService.getAllCharacters}
        renderItem={(item) => `${item.name} (${item.gender})`}
      />
    );

    const charDetails = (
      <CharDetails charId={this.state.selectedItem}>
        <Field field="gender" label="Gender"/>
        <Field field="born" label="Born"/>
        <Field field="died" label="Died"/>
        <Field field="culture" label="Culture"/>
        
      </CharDetails>);


    return <RowBlock left={itemList} right={charDetails} />
  }
}