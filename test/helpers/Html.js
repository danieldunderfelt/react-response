import React, {Component, PropTypes} from 'react'
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

	render() {
		const {assets, component} = this.props
		const content = ReactDOM.renderToString(component)

		return (
			<html lang="en-us">
			<head>
				<meta charSet="utf-8"/>

				{/* styles (will be present only in production with webpack extract text plugin) */}
				{Object.keys(assets.styles).map((style, key) =>
					<link href={assets.styles[style]} key={key} media="screen, projection" rel="stylesheet" type="text/css"/>
				)}
			</head>
			<body>
			<div id="root" dangerouslySetInnerHTML={{__html: content}}></div>
			<script src={ assets.javascript.main }></script>
			</body>
			</html>
		)
	}
}

Html.propTypes = {
	assets: PropTypes.object,
	component: PropTypes.object,
	store: PropTypes.object
}

export default Html