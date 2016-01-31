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
        >{ [<Null />] }</ReactServer>
    )

    t.doesNotThrow(
        () => { ReactServer.serve(serverComp) },
        new RegExp("Invariant Violation"),
        'serve accepts a ReactServer.'
    )

    t.end()
})

test('serve accepts nothing else than a ReactServer component', t => {

    t.throws(
        () => { ReactServer.serve(<Null />) },
        new RegExp("Invariant Violation"),
        'serve accepts nothing else than a ReactServer.'
    )

    t.end()
})