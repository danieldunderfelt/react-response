import React from 'react'
import Middleware from './Middleware'
import serveFavicon from 'serve-favicon'

class Favicon extends React.Component {

    render() {

        return (
            <Middleware use={serveFavicon(this.props.path)}/>
        )
    }
}

export default Favicon