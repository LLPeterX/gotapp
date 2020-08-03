import React from 'react';
//import spinner from './preloader.gif'
import spinner from './Spin-1s-200px.gif'
import style from './spinner.css'

export default class Spinner extends React.Component {
  render() {
    return (
      <div className={style.spinner}>
        <img src={spinner} alt="Loading..." />
      </div>
    )
  }

}