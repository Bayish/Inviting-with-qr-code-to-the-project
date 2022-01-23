import React from 'react';
import './Backdrop.css';

const Backdrop = ({show, onClick}) => {
  return show ? <div className="Backdrop"><p onClick={onClick} style={{position: "fixed", zIndex: '501', color: 'white', top: '5%', right: '4%', fontSize: '25px'}}>x</p></div> : null;
};

export default Backdrop;