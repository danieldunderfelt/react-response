import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom/server'
import invariant from 'invariant'
import Express from 'express'
import http from 'http'
import https from 'https'

class ReactServer extends Component {

    static propTypes = {
        host: PropTypes.string.isRequired,
        port: PropTypes.number.isRequired,
        serverApp: PropTypes.func.isRequired,
        servers: PropTypes.object.isRequired,
        protocol: PropTypes.string
    };

    static defaultProps = {
        host: '0.0.0.0',
        port: 3000,
        protocol: 'http',
        servers: { http, https },
        serverApp: new Express()
    };

    static buildServer(props) {
        const { servers, protocol, serverApp, host, port, children } = props

        const server = new servers[protocol].Server(serverApp)

        const config = {
            host,
            port,
            protocol
        }

        return {
            server,
            serverApp,
            config,
            children
        }
    }
}

export default ReactServer