export const runServer = (server, config) => {

    if(config.port) {
        server.listen(config.port, config.host, (err) => {
            if(err) {
                console.error(err)
            }
            console.info(`==> 💻  Open ${config.protocol}://${config.host}:${config.port} in a browser to view the app.`)
        })
    } else {
        console.error('==>     ERROR: No PORT variable has been specified')
    }
}