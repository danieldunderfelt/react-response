import React, { PropTypes } from 'react'
import Middleware from './Middleware'
import serveFavicon from 'serve-favicon'
import path from 'path'
import invariant from 'invariant'

class Favicon extends React.Component {

    static propTypes = {
        path: PropTypes.string.isRequired,
        faviconMiddleware: PropTypes.func.isRequired
    };

    static defaultProps = {
        faviconMiddleware: serveFavicon
    };

    static buildServer(props, parent) {
        return Middleware.buildServer({ use: props.faviconMiddleware(props.path) }, parent)
    }
}

export default Favicon