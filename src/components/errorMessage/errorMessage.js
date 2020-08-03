import React from 'react'
import style from './errorMessage.module.css'

export default class ErrorMessage extends React.Component {
  render() {
    return(
      <React.Fragment>
        <span className={style.red}>Что-то пошло не так</span>
      </React.Fragment>
    );
  }
  
}