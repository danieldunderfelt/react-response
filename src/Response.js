import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom/server'
import { RouterContext } from 'react-router'
import { appMiddleware } from './server/appMiddleware'
import invariant from 'invariant'

class Response extends Component {

    static propTypes = {
        routes: PropTypes.object.isRequired,
        path: PropTypes.string.isRequired,
        method: PropTypes.string.isRequired
    };

    static defaultProps = {
        path: "/",
        method: "get"
    };

    static buildServer(props, parent) {
        let renderFn = Response.renderFn

        if(typeof props.children === 'function') {
            renderFn = props.children
        }

        const responseHandler = appMiddleware(
            props.routes,
            parent.template.component,
            renderFn
        )

        let { route } = parent

        // If using the simplest "Hello world" config, the route has not been set.
        // Then we need the default props from this component.
        if(typeof route === 'undefined') {
            route = props
        }

        parent.serverApp[route.method](route.path, responseHandler)

        return {
            response: {
                handler: responseHandler
            }
        }
    }

    static renderFn(renderProps, req, res) {

        return { component: ReactDOM.renderToString(
            <RouterContext { ...renderProps } />
        ) }
    }
}

export default Response