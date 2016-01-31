import React, { PropTypes } from 'react'
import Middleware from './Middleware'
import path from 'path'
import Express from 'express'
import invariant from 'invariant'

class Static extends React.Component {

    static propTypes = {
        path: PropTypes.string.isRequired
    };

    static defaultProps = {
        path: path.join(__dirname, '..', 'static')
    };

    static buildServer(obj) {
        Middleware.buildServer(<Middleware use={ Express.static(obj.props.path) } />)
    }

    render() {
        invariant(false, "'Static' is used to tell Express that it can find and serve static files in a path. It is, like all elements in 'react-server', not directly renderable.")
    }
}

export default Static