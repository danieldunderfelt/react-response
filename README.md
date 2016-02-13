React-response
===

React-response provides an easy-to-use server-side rendering server for React.
The goal of this project is to reduce the boilerplate you need for a universal React project. Instead of copy-pasting a server from somewhere, React-response makes it possible to quickly write a production-ready server-side React renderer yourself. This will enable you to focus on your app without worrying about how to implement server-side rendering.

The configuration of your React-response is done with familiar React components, kind of like React Router's route configuration. Almost all of the props have sensible defaults, so for the simplest apps you really don't have to do a lot to get a server running.

> Production-ready stability is one of my end goals but we're still in the early days. Use in production at your own risk!

What's it look like?
---

Glad you asked. The simplest hello World with React-response looks like this:

```javascript
import { ReactServer, Response, serve, createServer } from 'react-response'

const server = createServer(
    <ReactServer>
        <Response />
    </ReactServer>
)

serve(server)

```

Running that will display a built-in Hello World page in your browser at `localhost:3000`.

The `ReactServer` component instantiates a new Express server. The `Response` component is responsible for rendering a React application at the specified Express route. The simplest example above demonstrates the built-in defaults, but most of React-response's behaviour is customizable. The full example illustrates all the ways you can customize React-response.

### The full example

```javascript
import { RouterContext } from 'react-router' // RouterContext is your root component if you're using React-router.
import routes from './routes' // React-router routes
import Html from './helpers/Html' // Your template component
import ReactResponse from 'react-response'

// Import all the things
const {
    ReactServer,
    Route,
    Response,
    serve,
    createServer,
    Middleware,
    Static,
    Favicon,
    createReactRouterResponse // Requires React-router to be installed in your project.
} = ReactResponse

/* Note that you need to install 'serve-favicon' and other middleware if you want to use them. */

const server = createServer(
    // Set basic server config on the ReactServer component.
    <ReactServer host="localhost" port="3000">
        // This is an Express route with the default props. Middlewares need to be
        // mounted inside a Route component.
        <Route path="/" method="get">
            // React-response ships with wrappers for some commonly used middleware.
            <Middleware use={ compression() }/>
            <Favicon path={ path.join(__dirname, '..', 'static', 'favicon.ico') }/>
            <Static path={ path.join(__dirname, '..', 'static') }/>

            // Set your template and appHandler.
            // React-response uses simple built-in templates and handlers by default.
            <Response template={ Html } appHandler={ createReactRouterResponse(routes) }>
                // Pass the React component you want to render OR
                // a custom render function as a child to Response.

                {(renderProps, req, res) => {

                    // Return a map of props for the template component. The Html component
                    // takes one prop: `component` which should be a rendered React component.
                    return { component: ReactDOM.renderToString(
                        <RouterContext { ...renderProps } />
                    ) }
                }}
            </Response>
        </Route>
        <Route path="/api"> // Many routes
            <Static path={ path.join(__dirname, '..', 'static') }/>
            <Middleware use={(req, res) => { /* Implement your APi proxy */ }} />
        </Route>
    </ReactServer>
)

serve(server)

```

Alright, this is more like it! As you can see, with React-response we attach middleware and app renderers to Routes, denoted by the `<Route />` component. This is, as we saw in the simple example, completely optional.

Express middleware is painless to use through the `<Middleware />` component. The middleware will be mounted on the route which the middleware component is a child of. Simply pass in a middleware function as the `use` prop. `Favicon` and `Static` middleware components ship with React-response. They are simple wrappers for the generic middleware component.

The `<Response />` component is where all the action happens. It receives your template component as a prop and the thing you want to render as a child. If you simply pass your app root component as a child to Response, Response will automatically render it to a string with ReactDOM. If you pass a function instead, it will be called with some props from the appHandler, as well as the request and response data from Express. This is called a custom render function.

The return value from your custom render function should be a map of props that will be applied to your template component. This is important!

React-response ships with two appHandlers; `simpleResponse` and `reactRouterResponse`. SimpleResponse will be used by default. Both modules export a factory function which should be called to produce the appHandler itself. This is your chance to supply additional props to the component that will be rendered! The reactRouterResponse factory expects your router config as its argument which will be used to serve your app. The simpleResponse factory simply splats any object you supply onto the rendered component.

To illustrate this, an example of the simpleResponse:

```javascript
<Response appHandler={ createSimpleResponse({ foo: "bar" }) }>
    <AppRoot />

    /* EQUALS */

    { renderProps => ({
        component: ReactDOM.renderToString(<AppRoot { ...renderProps } />)
    }) }
</Response>
```

The custom render function in the above example will receive `{ foo: "bar" }` as the `renderProps` argument. If you simply pass your root component as Response's child, the renderProps will be applied to it.

This is not very useful in the case of the `simpleResponse`. If you use `reactRouterResponse`, you give your route config to the factory and the handler outputs `renderProps` from React-router. An example:

```javascript
<Response appHandler={ createReactRouterResponse(routes) }>
    <RouterContext />

    /* EQUALS */

    { renderProps => ({
        component: ReactDOM.renderToString(<RouterContext { ...renderProps } />)
    }) }
</Response>
```
Note that `<RouterContext />` will initially complain about missing props as you start the server if you do not give it the renderProps right away. This is OK and won't hinder the functionality of your app.

Again, remember to return *a map of props for the template component*. The simple Html skeleton that ships with React-response expects your stringified app as the `component` prop, as illustrated in the examples.

The whole React-response setup is fed into the `createServer` function. It compiles a fully-featured Express server from the components which you can feed to the `serve` function.

### A note on JSX

I know that some developers are not fond of JSX and prefer vanilla Javascript. My decision to use JSX and even React components for server configuration is bound to raise eyebrows. For me it comes down to preference, usability and how it looks. React-response is all about eliminating React boilerplate and easing the cognitive load of writing a server-side rendering server, so the last thing I wanted was a declarative and messy configuration.

The very first thing I did with React-response was to design the user interface of the configuration. While the data is not naturally nested like React Router's routes, I feel that using JSX and React components to build the server configuration gives React-response a distinct "React identity". Rendering React components on the server should just be a matter of composing them into the server configuration. It is also very easy to see what is going on from a quick glance at the configuration tree, and in my opinion it is much better than plain Javascript objects.

However, if you do not wish to use JSX, inspect the output of `createServer`. It should be rather simple to re-create that object structure without JSX. Note that the components, like `Middleware` and `Response`, directly apply middleware and handlers to the Express instance.

Rest assured that I plan to fully support usage of React-response without React components, à la React Router. It just isn't a priority for the first few releases.

# Getting started

First, install React-response:
`npm install --save react-response`

Make sure you have React-response's peerDependencies (react react-dom express) installed. Also install any middleware you want to use through the components. Also be sure to have React-router installed if you want to use the React-router response handler.

Then, follow the examples above to set up your server config. When done, feed the config to `createServer` and the output of `createServer` into `serve`.

Before unleashing `node` on your server file, keep in mind that you need Babel to transpile the JSX. I suggest using `babel-core/register` to accomplish this if you do not have transpiling enabled for your server-side code. Like this:

```javascript
// server.babel.js
require('babel-core/register')
require('server.js') // Your server file
```

Then run that file with Node.

When run, React-response will output the URL where you can see your app. By default that is `http://localhost:3000`.

# Future plans

This is but the very first release of React-response! Plans for the future include:

- Template engines like Jade and EJS
- Option to use something else than Express
- Add more `Response` components for the following needs:
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
    - The wrapper component for React-response. This component instantiates `http` and `Express`.
- `Route`
    - Props:
        - *path*
            - Type: string,
            - Default: '/'
        - *method*
            - Type: string,
            - Default: 'get'
    - This component establishes a route context for the application handler and middleware. If `get` requests to the `/` route is all you need to serve, you can skip the `Route` component. Everything mounted as children for this component will be served under the specified path.
- `Response`
    - Props:
        - *template*
            - Type: React component
            - Default: simple React HTML template
        - *appHandler*
            - type: function
            - default: `simpleResponse`
    - Children:
        - *custom render function*
            - Type: function
                - Arguments: `renderProps`, `req`, `res`
        - **OR**
        - *your app root element*
            - Type: React element
    - The Response component creates a route handler for rendering your app. The handler will handle the route specified by the `Route` component, or `get` on `/` by default. Without specifying a custom render function or your app root element as a child to `Response`, React-response will simply render a Hello World page.
- `Middleware`
    - Props:
        - *use*
            - Type function (Express middleware)
            - Default: dummy middleware
    - Directly applies the specified middleware into Express. Using this generic Middleware component you can accomplish many features that React-response does not currently cater to.
- `createReactRouterResponse`
    - Arguments:
        - React Router route configuration
    - Returns:
        - Response handler that uses React Router
    - Make sure to have React Router installed if you use this!
- `createSimpleResponse`
    - Arguments:
        - Object of props to apply to the component you are rendering
    - Simply gives your component, stringified, to the template and sends that as the response.

By inspecting the source code you might find out that the components can take more props than documented. These exist mainly for testing and decoupling purposes. Usage of undocumented props is not supported, but I am not your mother.

# Test and build

I have a very simple React project set up in `/test/consumer` that demonstrates how to use React-response. `cd` into there and run `node ./consumerenv.js` to run the test app. Unit tests are located in `/test`and can be run with `gulp test`. This project uses Tape and Sinon for testing.

To build the library simply run `gulp build`.