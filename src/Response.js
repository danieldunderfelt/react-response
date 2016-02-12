import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom/server'
import { createSimpleResponse } from './handlers/simpleResponse'
import ReactResponseGreeter from './utils/ReactServerGreeter'
import invariant from 'invariant'

const factory = () => {

    const getTemplatePropsProvider = children => {
        // If the passed child is a custom render function
        if(typeof children === "function") {
            return children

        } else if(React.isValidElement(children)) {
            // Otherwise it is the thing we want to render
            return (renderProps, req, res) => ({
                component: ReactDOM.renderToString(
                    React.cloneElement(children, { ...renderProps })
                )
            })
        }

        invariant(false, "Pass a render function or the element you want to render to Response as a child.")
    }

    const buildServer = (props, parent) => {
        const { appHandler, template, children } = props

        const responseHandler = appHandler(
            template,
            getTemplatePropsProvider(children)
        )

        const route = typeof parent.route === "undefined" ?
            props.route :
            parent.route

        parent.serverApp[route.method](route.path, responseHandler)

        return {
            response: {
                handler: responseHandler
            }
        }
    }

    class Response extends Component {

        static propTypes = {
            template: PropTypes.element.isRequired,
            path: PropTypes.string.isRequired,
            method: PropTypes.string.isRequired,
            children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
            appHandler: PropTypes.func.isRequired
        };

        static defaultProps = {
            path: "/",
            method: "get",
            children: <ReactResponseGreeter />,
            appHandler: createSimpleResponse()
        };

        static buildServer = buildServer;
    }

    return Response
}

export default factory()