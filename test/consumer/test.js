import React from 'react'
import ReactDOM from 'react-dom/server'
import path from 'path'
import routes, { Home } from './routes'
import compression from 'compression'
import { RouterContext } from 'react-router'


class Test extends React.Component {

    render() {

        return (
            <div>
                <h1>
                    Trolololo!
                </h1>
            </div>
        )
    }
}


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
        <Response>
            <Test />
        </Response>
    </ReactServer>
)

serve(server)