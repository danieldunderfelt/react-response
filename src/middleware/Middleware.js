import React, { PropTypes } from 'react'
import { addMiddleware } from '../server/server'
import invariant from 'invariant'

class Middleware extends React.Component {

    static propTypes = {
        host: PropTypes.string.isRequired,
        port: PropTypes.number.isRequired,
        protocol: PropTypes.string,
        children: PropTypes.arrayOf(PropTypes.object)
    };

    static defaultProps = {
        route: '/',
        use: (req, res) => console.warning("Empty middleware added.")
    };

    static buildServer(obj) {
        const { host, port, protocol } = obj.props
        addMiddleware({ host, port, protocol })
    }

    render() {
        invariant(false, "Would you download a car? Would you render a component-that-isn't-really-a-component? Yes to the first, no to the latter.")
    }
}

export default Middleware