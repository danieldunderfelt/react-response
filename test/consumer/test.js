import React from 'react'
import path from 'path'
import routes from './routes'
import compression from 'compression'

import Html from './helpers/Html'

import { ReactServer, Template, Route, Response } from '../../src'
import { serve, createServer } from '../../src/server'
import { Middleware, Static, Favicon } from '../../src/middleware'

const server = createServer(
    <ReactServer>
        <Template component={ Html }>
            <Response routes={ routes } />
        </Template>
    </ReactServer>
)

serve(server)