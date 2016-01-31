import test from 'tape'
import React from 'react'
import ReactServer from '../src/ReactServer'
import Null from './helpers/Null'
import sinon from 'sinon'

test('ReactServer exposes `serve`', t => {
    t.equals(typeof ReactServer.serve, 'function', 'serve is exposed and a function.')
    t.end()
})

test('serve accepts only a ReactServer component', t => {
    const serverComp = (
        <ReactServer
            serverBuilder={ sinon.stub() }
            runServer={ sinon.stub() }
        ><Null /></ReactServer>
    )

    t.doesNotThrow(
        () => { ReactServer.serve(serverComp) },
        /Invariant Violation/,
        'serve accepts a ReactServer.'
    )

    t.end()
})

test('serve accepts nothing else than a ReactServer component', t => {

    t.throws(
        () => { ReactServer.serve(<Null />) },
        /Invariant Violation/,
        'serve accepts nothing else than a ReactServer.'
    )

    t.end()
})

test('serve runs the server once build is done', t => {
    const serverApi = { builder() {}, runner() {} }
    const serverBuilder = sinon.spy(serverApi, "builder")
    const serverRunner = sinon.spy(serverApi, "runner")

    const serverComp = (
        <ReactServer
            serverBuilder={ serverApi.builder }
            runServer={ serverApi.runner }>
            <Null />
        </ReactServer>
    )

    ReactServer.serve(serverComp)

    t.ok(serverBuilder.withArgs(serverComp).calledOnce, "Server builder called.")
    t.ok(serverRunner.calledAfter(serverBuilder), "Server runner called.")

    t.end()
})