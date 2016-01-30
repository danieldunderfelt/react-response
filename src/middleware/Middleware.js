import React from 'react'

class Middleware extends React.Component {

    render() {

        return this.props.use
    }
}

export default Middleware