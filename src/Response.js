import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom/server'
import { createSimpleResponse } from './handlers/simpleResponse'
import ReactResponseGreeter from './utils/ReactResponseGreeter'
import Html from './utils/Html'
import { createTemplateString } from './utils/createTemplateString'

const factory = () => {

    const defaultRenderingFunction = ReactElement => (renderProps, req, res) => ({
        component: ReactDOM.renderToString(
            React.cloneElement(ReactElement, { ...renderProps })
        )
    })

    const createTemplatePropsProvider = (children, renderFunction) => {

        if(React.isValidElement(children)) {
            // If it is the thing we want to render
            return renderFunction(children)
        }

        // Otherwise we take it in good faith that it is a custom render function.
        return children
    }

    const createRenderResponse = Template => (templateProps, res) => {
        res.status(200).send(createTemplateString(templateProps, Template))
    }

    const buildServer = (props, parent) => {
        const { appHandler, template, children, renderFunction } = props

        const responseHandler = appHandler(
            createRenderResponse(template),
            createTemplatePropsProvider(children, renderFunction)
        )

        const route = typeof parent.route === "undefined" ?
            props :
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
            template: PropTypes.func.isRequired,
            path: PropTypes.string.isRequired,
            method: PropTypes.string.isRequired,
            children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
            appHandler: PropTypes.func.isRequired,
            renderFunction: PropTypes.func.isRequired
        };

        static defaultProps = {
            path: "/",
            method: "get",
            template: Html,
            children: <ReactResponseGreeter />,
            appHandler: createSimpleResponse(),
            renderFunction: defaultRenderingFunction
        };

        static buildServer = buildServer;
    }

    return Response
}

export default factory()