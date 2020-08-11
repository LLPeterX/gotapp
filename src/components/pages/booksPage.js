import React from 'react'
import ItemList from '../itemList';
//import ItemDetails, { Field } from '../itemDetails';
import ErrorMessage from '../errorMessage'
import gotService from '../../services/gotService'
//import RowBlock from '../rowBlock'
import {withRouter} from 'react-router-dom'

class BooksPage extends React.Component {
  state = { 
    //selectedBook: 1, 
    error: false };
  gotService = new gotService();

  // onBookSelect = (id) => {
  //   this.setState({ selectedBook: id });
  // }

  componentDidCatch() {
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />
    }
    // const booksList = (
    //   <ItemList
    //     onItemSelect={this.onBookSelect}
    //     getData={this.gotService.getAllBooks}
    //     renderItem={(book) => `${book.name} (${book.released})`}
    //   />
    // );

    // const bookDetails = (
    //   <ItemDetails itemId={this.state.selectedBook} getData={this.gotService.getBook}>
    //     <Field field="released" label="Released" />
    //     <Field field="publisher" label="Publisher" />
    //     <Field field="numberOfPages" label="Pages" />
    //   </ItemDetails>
    // );


   // return <RowBlock left={booksList} right={bookDetails} />
   return (<ItemList
    onItemSelect={(itemId) => {
      this.props.history.push(`/books/${itemId}`)
    }}
    getData={this.gotService.getAllBooks}
    renderItem={(book) => `${book.name} (${book.released})`}
  />);
  }
}

export default withRouter(BooksPage);