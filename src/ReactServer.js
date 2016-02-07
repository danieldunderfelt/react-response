import React, { PropTypes, Component } from 'react'
import invariant from 'invariant'
import Express from 'express'
import http from 'http'

class ReactServer extends Component {

    static propTypes = {
        host: PropTypes.string.isRequired,
        port: PropTypes.number.isRequired,
        serverApp: PropTypes.func.isRequired,
        server: PropTypes.func.isRequired
    };

    static defaultProps = {
        host: '0.0.0.0',
        port: 3000,
        server: http.Server,
        serverApp: new Express()
    };

    static buildServer(props) {
        const { server, serverApp, host, port, children } = props

        const serverInstance = new server(serverApp)

        const config = {
            host,
            port
        }

        return {
            server: serverInstance,
            serverApp,
            config,
            children
        }
    }
}

export default ReactServer