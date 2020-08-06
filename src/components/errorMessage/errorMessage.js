import React from 'react';
import img from './error.jpg';
import style from './errorMessage.module.css'

const ErrorMessage = () => {
  return (
    <div className={style.container}>
      <img src={img} alt="Error"></img>
      <div className={style.text}>Something goes wrong :(</div>
    </div>
  )

}
export default ErrorMessage;