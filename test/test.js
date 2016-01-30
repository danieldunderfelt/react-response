require('../testenv')

import React from 'react'
import path from 'path'
import { RouterContext } from 'react-router'
import routes from './routes'
import compression from 'compression'
import favicon from 'serve-favicon'

import Html from 'helpers/Html'

ReactServer.serve(
    <ReactServer host="localhost" port="3000">
        <Middleware use={compression()}/>
        <Favicon path={ path.join(__dirname, '..', 'static', 'favicon.ico') }/>
        <Static path={ path.join(__dirname, '..', 'static') }/>

        <Renderer routes={routes}>
            <Response template={Html}>
                {renderApp}
            </Response>
        </Renderer>
    </ReactServer>
)

function renderApp(renderProps, req, res) {

    const component = (
        <RouterContext { ...renderProps }  />
    )

    return {component}
}