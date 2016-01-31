import test from 'tape'
import React from 'react'
import ReactServer from '../src/ReactServer'

test('ReactServer exposes `serve`', t => {
    t.ok(ReactServer.hasOwnProperty('serve'), 'serve is exposed.')
    t.end()
})