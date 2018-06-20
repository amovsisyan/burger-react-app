import React, {Component} from 'react';
import ReactAux from '../../../hoc/ReactAux/ReactAux'
import Backdrop from '../Backdrop/Backdrop'

import classes from './Modal.css'

class Modal extends Component {
    shouldComponentUpdate (nextProps, nextState) {
        return (nextProps.show !== this.props.show // we do this check to not let OrderSummary be rendered per each change. Just be rendered only when it shows
        ||
        nextProps.children !== this.props.children
        )
    };

    render () {
        return (
            <ReactAux>
                <Backdrop
                    show={this.props.show}
                    clicked={this.props.modalClosed}
                />
                <div
                    className={classes.Modal}
                    style={
                        {
                            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                            opacity: this.props.show ? '1' : '0'
                        }
                    }
                >
                    {this.props.children}
                </div>
            </ReactAux>
        );
    }
}

export default Modal;