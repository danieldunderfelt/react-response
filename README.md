React server
===

React Server provides an easy-to-use server-side rendering server for React.
The goal of this project is to partially remove ownership of the server itself from your project while maintaining a good level of customizability. This makes starting a new universally-rendered project much easier as you do not have to worry about setting up your server.

The configuration of your React Server is done with familiar React components, kind of like React Router's route configuration. Almost all of the props have sensible defaults, so for the simplest apps you really don't have to do a lot to get a server running.

> Production-ready stability is one of my end goals but we're still in the early days. Use in production at your own risk!

What's it look like?
---

Glad you asked. The simplest hello World with React Server looks like this:

```
import routes from './routes' // React-router routes
import Html from './helpers/Html' // Your template component
import { ReactServer, Template, Response, serve, createServer } from 'react-server'

const server = createServer(
    <ReactServer>
        <Template component={ Html }>
            <Response routes={ routes } />
        </Template>
    </ReactServer>
)

serve(server)

```

Compared to the novel you had to write (or copy-paste from a boilerplate) before, I'd say that's a pretty good improvement!

As you may have noticed, the `<Response />` component consumes React Router routes. Yes, React Router is a peerDependency, along with React, React DOM and Express. I assume that most projects that need server-side rendering already uses React Router.

> React Server is based on Express. If you're not using Express, rest assured that it is not suuuuper tightly coupled. I might eventually look at having interchangeable servers, but it is not a priority for now.

That small example is all well and good for showing off, but next we'll have a look at how to customize React Server for your needs.

### The full example

```
import { RouterContext } from 'react-router' // Import if using a custom render function
import routes from './routes' // React-router routes
import Html from './helpers/Html' // Your template component
import { ReactServer, Template, Route, Response, serve, createServer } from 'react-server'
import { Middleware, Static, Favicon } from 'react-server/middleware'

const server = createServer(
    <ReactServer host="localhost" port={ 3000 } protocol="http">
        <Route path="/" method="get">

            // All the middlewares! React Server ships with some commonly used ones.
            <Middleware use={ compression() }/>
            <Favicon path={ path.join(__dirname, '..', 'static', 'favicon.ico') }/>
            <Static path={ path.join(__dirname, '..', 'static') }/>

            // Set your template component
            <Template component={ Html }>
                <Response routes={ routes }>
                    // Custom render function for your Reduxes and whatnot
                    {(renderProps, req, res) => {

                        // Return props for the template component
                        return { component: ReactDOM.renderToString(
                            <RouterContext { ...renderProps } />
                        ) }
                    }}
                </Response>
            </Template>
        </Route>
        <Route path="/api"> // many routes
            <Static path={ path.join(__dirname, '..', 'static') }/>
        </Route>
    </ReactServer>
)

serve(server)

```

Alright, this is more like it! As you can see, with React Server we attach middleware and app renderers to Routes, denoted by the `<Route />` component. This is, as we saw in the simple example, completely optional.

Express middleware is painless to use through the `<Middleware />` component. The middleware will be mounted on the route which the middleware component is a child of. Simply pass in a middleware function as the `use` prop. `Favicon` and `Static` middleware components ship with React Server. They are simply wrappers for the generic middleware component.

The `<Response />` component will handle rendering of React Router's `<RouterContext />` by default. If you need to render something else, for example Redux's `<Provider>`, pass a callback function as a child to `<Response />` and take care of it there.