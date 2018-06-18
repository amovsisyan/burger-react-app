import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/Backdrop/Backdrop';
import ReactAux from '../../../hoc/ReactAux/ReactAux';

import classes from './SideDrawer.css'

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];

    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <ReactAux>
            <BackDrop
                show={props.open}
                clicked={props.closed}
            />
            <div className={attachedClasses.join(' ')}>
                <Logo />
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </ReactAux>
    );
};

export default sideDrawer;