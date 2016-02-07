import React, { PropTypes } from 'react'
import invariant from 'invariant'

class Middleware extends React.Component {

    static propTypes = {
        use: PropTypes.func.isRequired
    };

    static defaultProps = {
        use: (req, res) => console.warning("Empty middleware added.")
    };

    static buildServer(props, parent) {

        parent.serverApp.use(parent.route.path, props.use)

        return {
            middleware: {
                route: parent.route.path,
                use: props.use
            }
        }
    }

    render() {}
}

export default Middleware