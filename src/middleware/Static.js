import React from 'react'
import Middleware from './Middleware'
import Express from 'express'

class Static extends React.Component {

    render() {

        return (
            <Middleware use={Express.static(this.props.path)} />
        )
    }
}

export default Static