import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom/server'
import { RouterContext } from 'react-router'
import { appMiddleware } from './server/appMiddleware'
import invariant from 'invariant'

class Response extends Component {

    static propTypes = {
        routes: PropTypes.object.isRequired,
        path: PropTypes.string.isRequired,
        method: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired,
        appHandler: PropTypes.func.isRequired
    };

    static defaultProps = {
        path: "/",
        method: "get",
        children: Response.renderFn,
        appHandler: appMiddleware
    };

    static buildServer(props, parent) {

        const { appHandler, routes, children } = props

        const responseHandler = appHandler(
            routes,
            parent.template.component,
            children
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