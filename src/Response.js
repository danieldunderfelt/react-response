import React from 'react'

class Response extends React.Component {

    render() {

        return {
            props: this.props,
            cb: this.props.children({}, {}, {})
        }
    }
}

export default Response