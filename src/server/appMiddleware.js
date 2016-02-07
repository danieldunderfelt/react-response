import React from 'react'
import ReactDOM from 'react-dom/server'
import { match } from 'react-router'

export const appMiddleware = (routes, Template, templatePropsProvider) => {

    function createResponse(props) {

        return `
            <!doctype html>
            ${ ReactDOM.renderToString(<Template { ...props } />) }
        `
    }

    return (req, res) => {
        match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
            if(redirectLocation) {
                res.status(301).redirect(redirectLocation.pathname + redirectLocation.search)
            } else if(error) {
                res.status(500).send(error.message)
            } else if(renderProps === null) {
                res.status(404).send('Not found')
            } else {
                const templateProps = templatePropsProvider(renderProps, req, res)
                res.status(200).send(createResponse(templateProps))
            }
        })
    }
}