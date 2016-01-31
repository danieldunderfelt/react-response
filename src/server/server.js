import Express from 'express'
import React from 'react'
import ReactDOM from 'react-dom/server'
import path from 'path'
import PrettyError from 'pretty-error'
import http from 'http'
import { match, RouterContext, createMemoryHistory } from 'react-router'

const pretty = new PrettyError()
const app = new Express()
const server = new http.Server(app)

let serverConfig = {
    host: '0.0.0.0',
    port: 3000,
    protocol: 'http'
}

export const addMiddleware = (middleware, path = '*') => {
    app.use(path, middleware)
}

export const addRoute = (controller, method = 'get', path = '*') => {
    app[method](path, controller)
}

export const addConfig = (cfg) => {
    serverConfig = { ...serverConfig, ...cfg }
}

export const runServer = () => {
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