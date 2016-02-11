import test from 'tape'
import sinon from 'sinon'
import React from 'react'
import Null from './helpers/Null'
import Response from '../src/Response'

test('Response has a buildServer method', t => {
    const el = <Response routes={{}} />

    t.equal(typeof el.type.buildServer, 'function', 'Response.buildServer is a function.')
    t.end()
})

test('Response runs the passed appHandler', t => {
    const appHandler = sinon.spy()

    const routes = {}
    const parent = {
        template: {
            component: Null
        },
        serverApp: {
            get(path, handler) {}
        }
    }
    const renderFn = sinon.stub()

    const el = (
        <Response
            appHandler={ appHandler }
            routes={ routes }
            children={ renderFn }
        />
    )

    Response.buildServer(el.props, parent)

    t.ok(appHandler.calledOnce, 'The appHandler was called once.')
    t.ok(appHandler.calledWithExactly(routes, parent.template.component, renderFn),
        'The appHandler was called with the correct arguments.')

    t.end()
})

test('Response applies the app handler to the Express route', t => {
    const appHandler = sinon.stub()
    const responseHandler = sinon.stub()

    appHandler.returns(responseHandler)

    const parent = {
        template: {
            component: Null
        },
        serverApp: {
            get(path, handler) {}
        }
    }

    const serverSpy = sinon.spy(parent.serverApp, 'get')

    const el = (
        <Response
            appHandler={ appHandler }
            routes={{}}
        />
    )

    Response.buildServer(el.props, parent)

    t.ok(serverSpy.calledOnce, 'The serverApp route was called once.')
    t.ok(serverSpy.calledWithExactly('/', responseHandler),
        'The responseHandler was attached to the route.')

    t.end()
})