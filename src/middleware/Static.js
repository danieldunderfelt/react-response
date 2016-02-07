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
        path: ''
    };

    static buildServer(props, parent) {
        return Middleware.buildServer({ use: Express.static(props.path) }, parent)
    }
}

export default Static