import { runServer } from './runServer'

// I admit, this wasn't a very complicated function.
export const serve = (server) => {
    runServer(server.server, server.config)
}