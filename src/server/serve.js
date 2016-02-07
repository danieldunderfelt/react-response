import { runServer } from './runServer'

export const serve = (server) => {

    runServer(server.server, server.config)
}