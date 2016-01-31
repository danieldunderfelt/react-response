import { PropTypes, Component } from 'react'
import invariant from 'invariant'

class Response extends Component {

    static propTypes = {
        template: PropTypes.either(PropTypes.element, PropTypes.string).isRequired,
        onRender: PropTypes.func,
        children: PropTypes.func
    };

    render() {
        invariant(false, "Contrary to generally-accepted semantics, a response is usually rendered. However, this one isn't.")
    }
}

export default Response