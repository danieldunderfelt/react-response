import React, { PropTypes, Component } from 'react'

class Template extends Component {

    static PropTypes = {
        component: PropTypes.element.isRequired
    };

    static buildServer(props) {
        return {
            template: {
                component: props.component
            },
            children: props.children
        }
    }

    render() {

    }
}

export default Template