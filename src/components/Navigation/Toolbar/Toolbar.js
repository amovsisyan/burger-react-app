import React from 'react';
import Logo from '../../Logo/Logo'
import NavigationItems from '../../../components/Navigation/NavigationItems/NavigationItems';
import DrawerToggle from '../../../components/Navigation/SideDrawer/DrawerToggle/DrawerToggle';

import classes from './Toolbar.css';

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle
                clicked={props.drawerToggleClicked}
            />
            <Logo />
            <div className={classes.DesktopOnly}>
                <NavigationItems />
            </div>
        </header>
    );
};

export default toolbar;