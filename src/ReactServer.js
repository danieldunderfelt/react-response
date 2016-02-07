import React, { PropTypes, Component } from 'react'
import Express from 'express'
import http from 'http'
import https from 'https'

class ReactServer extends Component {

    static propTypes = {
        host: PropTypes.string.isRequired,
        port: PropTypes.number.isRequired,
        serverApp: PropTypes.func.isRequired,
        server: PropTypes.object.isRequired
    };

    static defaultProps = {
        host: '0.0.0.0',
        port: 3000,
        protocol: 'http',
        server: { http: http.Server, https: https.Server },
        serverApp: new Express()
    };

    static buildServer(props) {
        const { server, serverApp, host, port, protocol, children } = props

        const serverInstance = new (server[protocol])(serverApp)

        const config = {
            host,
            port,
            protocol
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