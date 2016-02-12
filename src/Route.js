import React, { PropTypes, Component } from 'react'

const factory = () => {

    const buildServer = (props) => ({
        route: {
            path: props.path,
            method: props.method
        },
        children: props.children
    })

    class Route extends Component {

        static propTypes = {
            path: PropTypes.string.isRequired,
            method: PropTypes.string.isRequired
        };

        static defaultProps = {
            path: "/",
            method: "get"
        };

        static buildServer = buildServer;
    }

    return Route
}

export default factory()