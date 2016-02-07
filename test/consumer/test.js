import React from 'react'
import path from 'path'
import routes from './routes'
import compression from 'compression'

import Html from './helpers/Html'

import { ReactServer, Template, Route, Response } from '../../src'
import { serve, createServer } from '../../src/server'
import { Middleware, Static, Favicon } from '../../src/middleware'

const server = createServer(
    <ReactServer host="localhost" port={ 3000 } protocol="http">
        <Route path="/" method="get">
            <Middleware use={ compression() }/>
            <Favicon path={ path.join(__dirname, 'helpers', 'favicon.ico') }/>
            <Static path={ path.join(__dirname, 'helpers') }/>

            <Template component={ Html }>
                <Response routes={ routes } />
            </Template>
        </Route>
        <Route path="/api">
            <Static path={ path.join(__dirname, '..', 'static') }/>
        </Route>
    </ReactServer>
)

serve(server)