import test from 'tape'
import sinon from 'sinon'
import React from 'react'
import Null from './helpers/Null'
import Response from '../src/Response'

test('Response has a buildServer method', t => {
    const el = <Response />

    t.equal(typeof el.type.buildServer, 'function', 'Response.buildServer is a function.')
    t.end()
})

test('Response runs the passed appHandler', t => {
    const appHandler = sinon.spy()

    const parent = {
        serverApp: {
            get(path, handler) {}
        }
    }
    const renderFn = sinon.stub()

    const el = (
        <Response
            appHandler={ appHandler }
            children={ renderFn }
        />
    )

    Response.buildServer(el.props, parent)

    t.ok(appHandler.calledOnce, 'The appHandler was called once.')
    t.ok(appHandler.calledWith(sinon.match.func, renderFn),
        'The appHandler was called with the correct arguments.')

    t.end()
})

test('Response applies the app handler to the Express route', t => {
    const appHandler = sinon.stub()
    const responseHandler = sinon.stub()

    appHandler.returns(responseHandler)

    const parent = {
        serverApp: {
            get(path, handler) {}
        }
    }

    const serverSpy = sinon.spy(parent.serverApp, 'get')

    const el = (
        <Response
            appHandler={ appHandler }
        />
    )

    Response.buildServer(el.props, parent)

    t.ok(serverSpy.calledOnce, 'The serverApp route was called once.')
    t.ok(serverSpy.calledWithExactly('/', responseHandler),
        'The responseHandler was attached to the route.')

    t.end()
})

test('Response creates a rendering function for child React elements', t => {
    const appHandler = sinon.stub()
    const renderFunction = sinon.stub()
    renderFunction.returns('app rendered to string')

    const template = sinon.stub()
    const childComponent = <Null />

    const parent = {
        serverApp: {
            get(path, handler) {}
        }
    }

    const el = (
        <Response template={ template } appHandler={ appHandler } renderFunction={ renderFunction }>
            { childComponent }
        </Response>
    )

    Response.buildServer(el.props, parent)

    t.ok(appHandler.calledWith(sinon.match.func, 'app rendered to string'), 'handler called with rendering function for passed element.')
    t.ok(renderFunction.calledWith(childComponent), 'The render function was called with the passed child component.')

    t.end()
})

test('Response returns the rendering function if passed', t => {
    const appHandler = sinon.stub()
    const template = sinon.stub()
    const renderingFn = sinon.stub()

    const parent = {
        serverApp: {
            get(path, handler) {}
        }
    }

    const el = (
        <Response template={ template } appHandler={ appHandler }>
            { renderingFn }
        </Response>
    )

    Response.buildServer(el.props, parent)

    t.ok(appHandler.calledWith(sinon.match.func, renderingFn), 'handler called with custom rendering function.')

    t.end()
})