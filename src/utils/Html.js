import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom/server'

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
class Html extends Component {

    static propTypes = {
        component: PropTypes.string
    };

    render() {
        const { component } = this.props

        return (
            <html>
                <head>
                    <meta charSet="utf-8"/>
                </head>
                <body>
                    <div id="root" dangerouslySetInnerHTML={ { __html: component } }></div>
                </body>
            </html>
        )
    }
}

export default Html