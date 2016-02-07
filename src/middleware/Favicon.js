import React, { PropTypes } from 'react'
import Middleware from './Middleware'
import serveFavicon from 'serve-favicon'
import path from 'path'
import invariant from 'invariant'

class Favicon extends React.Component {

    static propTypes = {
        path: PropTypes.string.isRequired
    };

    static defaultProps = {
        path: ''
    };

    static buildServer(props, parent) {
        return Middleware.buildServer({ use: serveFavicon(props.path) }, parent)
    }

    render() {}
}

export default Favicon