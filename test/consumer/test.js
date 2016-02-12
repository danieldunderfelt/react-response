import React from 'react'
import ReactDOM from 'react-dom/server'
import path from 'path'
import routes from './routes'
import compression from 'compression'
import { RouterContext } from 'react-router'

import Html from './../../src/utils/Html'

import { ReactServer, Route, Response, serve, createServer } from '../../src'
import { Middleware, Static, Favicon } from '../../src/middleware'
import { createReactRouterResponse } from '../../src/handlers/reactRouterResponse'

const server = createServer(
    <ReactServer>
        <Route>
            <Middleware use={ compression() }/>
            <Favicon path={ path.join(__dirname, 'helpers', 'favicon.ico') }/>
            <Static path={ path.join(__dirname, 'helpers') }/>
        </Route>

        <Response template={ Html } appHandler={ createReactRouterResponse(routes) }>
            { (renderProps) => ({ component: ReactDOM.renderToString(<RouterContext { ...renderProps } /> ) }) }
        </Response>

        <Route path="/api">
            <Static path={ path.join(__dirname, '..', 'static') }/>
        </Route>
    </ReactServer>
)

serve(server)