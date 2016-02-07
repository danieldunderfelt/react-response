import PrettyError from 'pretty-error'
const pretty = new PrettyError()

export const runServer = (server, config) => {

    if(config.port) {
        server.listen(config.port, config.host, (err) => {
            if(err) {
                pretty.render(err)
            }
            console.info(`==> 💻  Open ${config.protocol}://${config.host}:${config.port} in a browser to view the app.`)
        })
    } else {
        console.error('==>     ERROR: No PORT environment variable has been specified')
    }
}