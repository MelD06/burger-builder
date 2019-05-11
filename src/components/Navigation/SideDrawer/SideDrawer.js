import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

import classes from './SideDrawer.module.css';

const sideDrawer = props => {

    const sideDrawerClasses = [classes.SideDrawer, props.open ? classes.Open : classes.Close].join(' ');

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
        <div className={sideDrawerClasses}>
        <div className={classes.Logo}>
            <Logo />
        </div>
            <nav>
                <NavigationItems />
            </nav>
        </div>
        </Aux>
    );
};

export default sideDrawer;