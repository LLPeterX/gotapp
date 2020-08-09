import React from 'react'
import ItemList from '../../itemList';
import ItemDetails, { Field } from '../../itemDetails';
import ErrorMessage from '../../errorMessage'
import gotService from '../../../services/gotService'
import RowBlock from '../../rowBlock'

export default class CharacterPage extends React.Component {
  state = { selectedItem: 130, error: false };
  gotService = new gotService();

  onCharacterSelect = (id) => {
    this.setState({ selectedItem: id });
  }

  componentDidCatch() {
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />
    }
    const charList = (
      <ItemList
        onItemSelect={this.onCharacterSelect}
        getData={this.gotService.getAllCharacters}
        renderItem={(item) => `${item.name} (${item.gender})`}
      />
    );

    const charDetails = (
      <ItemDetails itemId={this.state.selectedItem} getData={this.gotService.getCharacter}>
        <Field field="gender" label="Gender" />
        <Field field="born" label="Born" />
        <Field field="died" label="Died" />
        <Field field="culture" label="Culture" />
      </ItemDetails>
    );


    return <RowBlock left={charList} right={charDetails} />
  }
}