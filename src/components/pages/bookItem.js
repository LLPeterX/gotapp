import React from 'react'
import ItemDetails, { Field } from '../itemDetails';
import gotService from '../../services/gotService'

export default class BooksItem extends React.Component {
  gotService = new gotService();

  render() {
    return (
      <ItemDetails itemId={this.props.bookId} getData={this.gotService.getBook}>
        <Field field="released" label="Released" />
        <Field field="publisher" label="Publisher" />
        <Field field="numberOfPages" label="Pages" />
      </ItemDetails>
    );
  }
}