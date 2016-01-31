import React, { PropTypes, Component } from 'react'
import invariant from 'invariant'
import { addConfig, runServer } from './server/server'

class ReactServer extends Component {

    static serve(serverConfig) {
        const { type, props } = serverConfig
        invariant(type.name === "ReactServer", "'serve' can only serve a ReactServer.")

        const activateElement = childObj => {

            // Return false from build fn to not traverse its children
            if(typeof childObj.buildServer === 'function' && childObj.buildServer(childObj) !== false) {
                childObj.props.children.forEach(el => activateElement(el))
            }
        }

        activateElement(serverConfig)
        runServer()
    }

    static propTypes = {
        host: PropTypes.string.isRequired,
        port: PropTypes.number.isRequired,
        protocol: PropTypes.string,
        children: PropTypes.arrayOf(PropTypes.object)
    };

    static defaultProps = {
        host: '0.0.0.0',
        port: 3000,
        protocol: 'http'
    };

    static buildServer(obj) {
        const { host, port, protocol } = obj.props
        addConfig({ host, port, protocol })
    }

    render() {
        invariant(false, "'In Soviet Russia, YOU render the server!' ...no? Well anyway, it's not really productive to render the server.")
    }
}

export default ReactServer