import React from 'react';

import classes from './DrawerToggle.css'

const drawerToggle = (props) => {
    return (
        <div
            className={classes.Menu}
            onClick={props.clicked}
        >
            Menu
        </div>
    );
};

export default drawerToggle;