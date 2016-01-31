import { PropTypes, Component } from 'react'
import invariant from 'invariant'
import { addConfig, runServer } from './server/server'
import { serverBuilder } from './server/serverBuilder'

class ReactServer extends Component {

    static propTypes = {
        host: PropTypes.string.isRequired,
        port: PropTypes.number.isRequired,
        protocol: PropTypes.string,
        serverBuilder: PropTypes.func.isRequired,
        runServer: PropTypes.func.isRequired,
        children: PropTypes.element
    };

    static defaultProps = {
        host: '0.0.0.0',
        port: 3000,
        protocol: 'http',
        serverBuilder,
        runServer
    };

    static serve(serverConfig) {
        const { type, props } = serverConfig

        invariant(type.name === "ReactServer", "serve can only serve a ReactServer.")

        props.serverBuilder(serverConfig)
        props.runServer()
    }

    static buildServer(obj) {
        const { host, port, protocol } = obj.props
        addConfig({ host, port, protocol })
    }

    render() {
        invariant(false, "'In Soviet Russia, YOU render the server!' ...no? Well anyway, it's not really productive to render the server.")
    }
}

export default ReactServer