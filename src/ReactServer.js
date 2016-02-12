import React, { PropTypes, Component } from 'react'
import Express from 'express'
import http from 'http'
import https from 'https'

const factory = () => {

    const buildServer = (props) => {
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

    class ReactServer extends Component {

        static propTypes = {
            host: PropTypes.string.isRequired,
            port: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            serverApp: PropTypes.func.isRequired,
            server: PropTypes.object.isRequired
        };

        static defaultProps = {
            host: 'localhost',
            port: 3000,
            protocol: 'http',
            server: { http: http.Server, https: https.Server },
            serverApp: new Express()
        };

        static buildServer = buildServer;
    }

    return ReactServer
}

export default factory()