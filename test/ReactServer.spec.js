import test from 'tape'
import React from 'react'
import ReactServer from '../src/ReactServer'
import Null from './helpers/Null'
import sinon from 'sinon'
import http from 'http'
import Express from 'express'

test('buildServer exists', t => {
    const el = <ReactServer />

    t.equal(typeof el.type.buildServer, 'function', 'ReactServer.buildServer is a function.')
    t.end()
})

test('buildServer returns formatted server config of ReactServers props', t => {

    const config = {
        host: 'localhost',
        port: 4000,
        protocol: 'http'
    }

    const el = (
        <ReactServer { ...config }>
            <Null />
        </ReactServer>
    )

    const result = ReactServer.buildServer(el.props)

    t.deepEqual(result.config, config, 'The server config is returned.')
    t.deepEqual(result.children, <Null />, 'The children are included in the result.')

    t.end()
})

test('buildServer instantiates the passed server', t => {
    const props = {
        server: http.Server,
        serverApp: Express
    }

    const serverMock = sinon.spy(props, 'server')
    const serverAppMock = sinon.spy(props, 'serverApp')

    const config = {
        server: { http: serverMock, https: class {} },
        serverApp: serverAppMock
    }

    const el = (
        <ReactServer { ...config }>
            <Null />
        </ReactServer>
    )

    const result = ReactServer.buildServer(el.props)

    t.ok(serverMock.calledWith(serverAppMock), 'The server was instantiated.')
    t.ok(serverMock.calledOnce, 'The server was called once.')
    t.ok(result.server instanceof serverMock, 'The server instance is returned')
    t.deepEqual(result.serverApp, serverAppMock, 'The server app is returned')

    t.end()
})