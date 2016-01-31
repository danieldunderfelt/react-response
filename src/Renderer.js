import React, { PropTypes, Children } from 'react'
import ReactDOM from 'react-dom/server'
import { match, RouterContext, createMemoryHistory } from 'react-router'
import invariant from 'invariant'
import prettyError from 'pretty-error'
import { addMiddleware } from './server/server'

class Renderer extends React.Component {

    static propTypes = {
        path: PropTypes.string.isRequired,
        method: PropTypes.string.isRequired,
        routes: PropTypes.object.isRequired,
        children: PropTypes.element.isRequired
    };

    static defaultProps = {
        path: '/',
        method: 'get'
    };

    static buildServer(obj) {
        const { routes, children } = this.props

        const response = Children.only(children)
        const Template = response.props.template
        const renderFn = response.props.onRender || response.props.children

        const appMiddleware = (req, res) => {
            match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
                if(redirectLocation) {
                    res.status(301).redirect(redirectLocation.pathname + redirectLocation.search)
                } else if(error) {
                    res.status(500).send(error.message)
                } else if(renderProps === null) {
                    res.status(404).send('Not found')
                } else {
                    createReponse(renderFn(renderProps, req, res))
                }
            })
        }

        const createReponse = (props) => {
            return `
                <!doctype html>
                ${ ReactDOM.renderToString(<Template { ...props } />) }
            `
        }

        addMiddleware(appMiddleware)

        return false
    }

    render() {
        invariant(false, "Yo dawg, don't render the renderer!")
    }
}

export default Renderer