import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom/server'
import { RouterContext } from 'react-router'
import { appMiddleware } from './server/appMiddleware'
import invariant from 'invariant'

class Response extends Component {

    static propTypes = {
        routes: PropTypes.object.isRequired
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

        const { route } = parent

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

    render() {
        invariant(false, "Contrary to generally-accepted semantics, a response is usually rendered. However, this one isn't.")
    }
}

export default Response