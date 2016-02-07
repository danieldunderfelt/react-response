import test from 'tape'
import React from 'react'
import { Favicon, Static, Middleware } from '../src/middleware'
import sinon from 'sinon'

test('Middleware has a buildServer method', t => {
    const el = <Middleware />

    t.equal(typeof el.type.buildServer, 'function', 'Middleware.buildServer is a function.')
    t.end()
})

test('buildServer applies middleware on the server app.', t => {
    const serverApp = sinon.spy({ use(path, fn) {} }, 'use')
    const middlewareStub = sinon.stub()

    const parent = {
        serverApp: {
            use: serverApp
        },
        route: {
            path: '/'
        }
    }

    const el = <Middleware use={ middlewareStub } />

    const result = Middleware.buildServer(el.props, parent)

    t.ok(serverApp.calledWithExactly('/', middlewareStub), 'Middleware is applied to server at the specified path.')
    t.deepEqual(result, {
        middleware: {
            route: '/',
            use: middlewareStub
        }
    }, 'Middleware compiles props and parent props correctly.')

    t.end()
})

test('Favicon works like generic Middleware component', t => {
    const faviconPath = './consumer/helpers/favicon.ico'

    const serverApp = sinon.spy({ use(path, fn) {} }, 'use')
    const faviconStub = sinon.stub()
    faviconStub.returns('favicon!')

    const el = <Favicon faviconMiddleware={ faviconStub } path={ faviconPath } />

    const parent = {
        serverApp: {
            use: serverApp
        },
        route: {
            path: '/trolololol'
        }
    }

    const result = Favicon.buildServer(el.props, parent)

    t.ok(faviconStub.calledWithExactly(faviconPath))
    t.ok(serverApp.calledWithExactly('/trolololol', 'favicon!'), 'Middleware is applied to server at the specified path.')
    t.deepEqual(result, {
        middleware: {
            route: '/trolololol',
            use: 'favicon!'
        }
    }, 'Middleware compiles props and parent props correctly.')

    t.end()
})

test('Static works like generic Middleware component', t => {
    const staticPath = './consumer/helpers'

    const serverApp = sinon.spy({ use(path, fn) {} }, 'use')
    const staticStub = sinon.stub()
    staticStub.returns('static!')

    const el = <Static staticMiddleware={ staticStub } path={ staticPath } />

    const parent = {
        serverApp: {
            use: serverApp
        },
        route: {
            path: '/trolololol'
        }
    }

    const result = Static.buildServer(el.props, parent)

    t.ok(staticStub.calledWithExactly(staticPath))
    t.ok(serverApp.calledWithExactly('/trolololol', 'static!'), 'Middleware is applied to server at the specified path.')
    t.deepEqual(result, {
        middleware: {
            route: '/trolololol',
            use: 'static!'
        }
    }, 'Middleware compiles props and parent props correctly.')

    t.end()
})