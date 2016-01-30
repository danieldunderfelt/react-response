import React from 'react'
import invariant from 'invariant'

class ReactServer extends React.Component {

    static serve(serverConfig) {
        console.log(serverConfig)
    }

    render() {
        invariant("'In Soviet Russia, YOU render the server!' ...no? Well anyway, it's not really productive to render the server.")
    }
}

export default ReactServer