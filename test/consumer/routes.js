import React from 'react'
import { Route, IndexRoute } from 'react-router'

function App(props) { return <div>App { props.children }</div> }
export function Home() { return <div>Home</div> }

export default  (
    <Route component={ App } path="/">
        <IndexRoute component={ Home } />
    </Route>
)