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
import { ReactServer, Template, Route, Response, serve, createServer, Middleware, Static, Favicon } from 'react-server'

/* Note that you need to install 'serve-favicon' and other middleware if you want to use them. */

const server = createServer(
    <ReactServer host="localhost" port={ 3000 }>
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

Express middleware is painless to use through the `<Middleware />` component. The middleware will be mounted on the route which the middleware component is a child of. Simply pass in a middleware function as the `use` prop. `Favicon` and `Static` middleware components ship with React Server. They are simple wrappers for the generic middleware component.

The `<Response />` component will handle rendering of React Router's `<RouterContext />` by default. If you need to render something else, for example Redux's `<Provider>`, pass a callback function as a child to `<Response />` and take care of it there. If you use a custom render function, it is your responsibility to render the React component to a string.

The return value from your custom render function should be a map of props that will be applied to your template component. This makes the render function a convenient place to fetch data and create your Redux store.

The whole React Server setup is fed into the `createServer` function. It traverses all the components and compiles a fully-featured Express server which you can feed to the `serve` function.

### A note on JSX

I know that some developers are not fond of JSX and prefer vanilla Javascript. My decision to use JSX and even React components for server configuration is bound to raise eyebrows. For me it comes down to preference, usability and how it looks. React Server is all about eliminating React boilerplate and easing the cognitive load of writing a server-side rendering server, so the last thing I wanted was a declarative and messy configuration.

The very first thing I did with React Server was to design the user interface of the configuration. While the data is not naturally nested like React Router's routes, I feel that using JSX and React components to build the server configuration gives React Server a distinct "React identity". Rendering React components on the server should just be a matter of composing them into the server configuration. It is also very easy to see what is going on from a quick glance at the configuration tree, and in my opinion it is much better than plain Javascript objects.

However, if you do not wish to use JSX, inspect the output of `createServer`. It should be rather simple to re-create that object structure without JSX. Note that the components, like `Middleware` and `Response`, directly apply middleware and handlers to the Express instance.

Rest assured that I plan to fully support usage of React Server without React components, à la React Router. It just isn't a priority for the first few releases.

# Getting started

First, install React Server:
`npm install --save react-server`

Make sure you have React Server's peerDependencies (react react-dom react-router express) installed. Also install any middleware you want to use through the components.

I do apologize for the number of dependencies. Its propbably nothing that you aren't already using though.

Then, follow one of the examples above to set up your server config. When done, feed the config to `createServer` and the output of `createServer` into `serve`.

Before unleashing `node` on your server file, keep in mind that you need Babel to transpile the JSX. I suggest using `babel-core/register` to accomplish this if you do not have transpiling enabled for your server-side code. Like this:

```
// server.babel.js
require('babel-core/register')
require('server.js') // Your server file
```

Then run that file with Node.

When run, React Server will output the URL where you can see your app in the console. By default that would be `http://localhost:3000`.

# Future plans

This is but the very first release of React Server! Plans for the future include:

- Template engines like Jade and EJS
- Option to use something else than Express
- Add more `Response` components for the following needs:
    - Without a React Router dependency
    - Redux
    - Redux React Router
- Production stability and more tests
- Integrated reverse proxy for external APIs
- Maybe a Relay server?
- Your suggestions!
- Other cool features

# Components

- `ReactServer`
    - Props:
        - *host*
            - Type: string
            - Default: '0.0.0.0'
        - *port*
            - Type: integer
            - Default: '3000'
    - The wrapper component for React Server. This component instantiates `http` and `Express`.
- `Route`
    - Props:
        - *path*
            - Type: string,
            - Default: '/'
        - *method*
            - Type: string,
            - Default: 'get'
    - This component establishes a route context for the application handler and middleware. If `get` requests to the `/` route is all you need to serve, you can skip the `Route` component. Everything mounted as children for this component will be served under the specified path.
- `Template`
    - Props:
        - *component*
            - Type: React component
            - Default: none
    - The Template component specifies the HTML template component you want to use for the route. This component will receive props from `Response`'s render function; only `component` by default. For now the only option is to use a React component, but I fully intend to make use of Express' native template engine capabilities to enable Jade, EJS and the rest. Stay tuned for future updates!
- `Response`
    - Props:
        - *routes*
            - Type: React Router route configuration
            - Default: none
    - Children:
        - *responseHandler*
            - Type: function
            - Arguments: `renderProps`, `req`, `res`
    - The Response component creates a route handler for rendering your app. The handler will hande the route specified by the `Route` component, or `get` on `/` by default. Without specifying a custom render function as a child to `Response`, React Server will simply render your React Router routes. In this case the props applied to your template is only `component`, which is your app rendered to a string.

- `Middleware`
    - Props:
        - *use*
            - Type function (Express middleware)
            - Default: dummy middleware
    - Directly applies the specified middleware into Express. Using this generic Middleware component you can accomplish many features that React Server does not currently cater to.

    By inspecting the source code you might find out that the components can take more props than documented. These exist mainly for testing and decoupling purposes. Usage of undocumented props is not supported, but I am not your mother.

    # Test and build

    I have a very simple React project set up in `/test/consumer` that demonstrates how to use React Server. `cd` into there and run `node ./consumerenv.js` to run the test app. Unit tests are located in `/test`and can be run with `gulp test`. This project uses Tape and Sinon for testing.

    To build the app simply run `gulp build`.