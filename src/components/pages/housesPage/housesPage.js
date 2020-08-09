import React from 'react'
import ItemList from '../../itemList';
import ItemDetails, { Field } from '../../itemDetails';
import ErrorMessage from '../../errorMessage'
import gotService from '../../../services/gotService'
import RowBlock from '../../rowBlock'

export default class HousesPage extends React.Component {
  state = { selectedItem: 1, error: false };
  gotService = new gotService();

  onHouseSelect = (id) => {
    this.setState({ selectedItem: id });
  }

  componentDidCatch() {
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />
    }
    const housesList = (
      <ItemList
        onItemSelect={this.onHouseSelect}
        getData={this.gotService.getAllHouses}
        renderItem={(house) => `${house.name} - ${house.region}`}
      />
    );

    const houseDetails = (
      <ItemDetails itemId={this.state.selectedItem} getData={this.gotService.getHouse}>
        <Field field="region" label="Region" />
        <Field field="titles" label="Titles" />
        <Field field="words" label="Words" />
        <Field field="overlord" label="Lord" />
        <Field field="ancestralWeapons" label="Ancestral Weapons" />
      </ItemDetails>
    );


    return <RowBlock left={housesList} right={houseDetails} />
  }
}