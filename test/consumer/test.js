import React from 'react'
import ReactDOM from 'react-dom/server'
import path from 'path'
import routes from './routes'
import compression from 'compression'
import { RouterContext } from 'react-router'

import Html from './helpers/Html'

import { ReactServer, Template, Route, Response, serve, createServer } from '../../src'
import { Middleware, Static, Favicon } from '../../src/middleware'

const server = createServer(
    <ReactServer host="localhost" port={ 3000 } protocol="http">
        <Route path="/" method="get">
            <Middleware use={ compression() }/>
            <Favicon path={ path.join(__dirname, 'helpers', 'favicon.ico') }/>
            <Static path={ path.join(__dirname, 'helpers') }/>

            <Template component={ Html }>
                <Response routes={ routes }>
                    {(renderProps, req, res) => {
                        return { component: ReactDOM.renderToString(
                            <RouterContext { ...renderProps } />
                        ) }
                    }}
                </Response>
            </Template>
        </Route>
        <Route path="/api">
            <Static path={ path.join(__dirname, '..', 'static') }/>
        </Route>
    </ReactServer>
)

serve(server)