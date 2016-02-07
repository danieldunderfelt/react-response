import React, { PropTypes, Component } from 'react'

class Route extends Component {

    static propTypes = {
        path: PropTypes.string.isRequired,
        method: PropTypes.string.isRequired
    };

    static defaultProps = {
        path: "/",
        method: "get"
    };

    static buildServer(props) {

        return {
            route: {
                path: props.path,
                method: props.method
            },
            children: props.children
        }
    }

    render() {}
}

export default Route