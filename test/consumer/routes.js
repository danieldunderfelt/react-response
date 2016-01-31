import React from 'react'
import { Route, IndexRoute } from 'react-router'

class App extends React.Component { render() { return <div>App</div> } }
class Home extends React.Component { render() { return <div>Home</div> } }

export default  (
    <Route component={App} path="/">
        <IndexRoute component={Home} />
    </Route>
)
