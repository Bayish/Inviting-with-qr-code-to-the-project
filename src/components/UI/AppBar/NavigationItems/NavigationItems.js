import React from 'react';
import c from './NavigationItems.module.css'
import NavigationItem from "../NavigationItem/NavigationItem";
import BurgerMenu from "../BurgerMenu/BurgerMenu";


const NavigationItems = () => {
  return (
    <>
      <div className={`${c.NavigationItems} ${c.activeBlock}`}>
        <NavigationItem to='/' exact>Главная</NavigationItem>
      </div>
      <div className={c.burger}>
        <BurgerMenu>
          <NavigationItem to='/' exact>Главная</NavigationItem>
        </BurgerMenu>
      </div>
    </>
  )
    ;
};

export default NavigationItems;
