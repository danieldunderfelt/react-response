import test from 'tape'
import { runServer } from '../src/server/runServer'
import sinon from 'sinon'

test('runServer runs the server.', t => {
    const serverStub = { listen() {} }
    const server = sinon.spy(serverStub, 'listen')

    const config = {
        port: 3000,
        host: 'localhost'
    }

    runServer(serverStub, config)

    t.ok(server.calledWith(3000, 'localhost'), 'runServer calls listen on server with the specified config.')

    t.end()
})