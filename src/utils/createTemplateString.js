import React from 'react'
import ReactDOM from 'react-dom/server'

export const createTemplateString = (props, Template) => `
    <!doctype html>
    ${ ReactDOM.renderToStaticMarkup(<Template { ...props } />) }
`