import Express from 'express'
import React from 'react'
import ReactDOM from 'react-dom/server'
import path from 'path'
import PrettyError from 'pretty-error'
import http from 'http'
import https from 'https'
import { match, RouterContext, createMemoryHistory } from 'react-router'

const pretty = new PrettyError()
const app = new Express()
const servers = { http, https }

let serverConfig = {
    host: '0.0.0.0',
    port: 3000,
    protocol: 'http'
}

export const addMiddleware = (middleware, route = '/') => {
    app.use(route, middleware)
}

export const addRoute = (controller, route = '/', method = 'get') => {
    app[method](route, controller)
}

export const addConfig = (cfg) => {
    serverConfig = { ...serverConfig, ...cfg }
}

export const runServer = () => {

    const server = new (servers[serverConfig.protocol]).Server(app)

    if(serverConfig.port) {
        server.listen(serverConfig.port, serverConfig.host, (err) => {
            if(err) {
                pretty.render(err)
            }
            console.info(`==> 💻  Open ${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port} in a browser to view the app.`)
        })
    }
    else {
        console.error('==>     ERROR: No PORT environment variable has been specified')
    }
}