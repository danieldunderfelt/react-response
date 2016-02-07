import React, { PropTypes } from 'react'
import Middleware from './Middleware'
import path from 'path'
import Express from 'express'

class Static extends React.Component {

    static propTypes = {
        path: PropTypes.string.isRequired,
        staticMiddleware: PropTypes.func.isRequired
    };

    static defaultProps = {
        staticMiddleware: Express.static
    };

    static buildServer(props, parent) {
        return Middleware.buildServer({ use: props.staticMiddleware(props.path) }, parent)
    }
}

export default Static