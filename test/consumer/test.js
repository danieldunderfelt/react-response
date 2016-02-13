import React from 'react'
import ReactDOM from 'react-dom/server'
import path from 'path'
import routes from './routes'
import compression from 'compression'
import { RouterContext } from 'react-router'

import Html from './../../src/utils/Html'

import ReactResponse from '../../src'
const {
    ReactServer,
    Route,
    Response,
    serve,
    createServer,
    Middleware,
    Static,
    Favicon,
    createReactRouterResponse
} = ReactResponse

const server = createServer(
    <ReactServer>
        <Response />
    </ReactServer>
)

serve(server)