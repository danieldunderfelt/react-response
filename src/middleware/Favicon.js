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
        path: path.join(__dirname, '..', 'static', 'favicon.ico')
    };

    static buildServer(obj) {
        Middleware.buildServer(<Middleware use={ serveFavicon(obj.props.path) } />)
    }

    render() {
        invariant(false, "Was it worth it; rendering the Favicon component?")
    }
}

export default Favicon