import React from 'react'
import { Route } from 'react-router-dom'
import Welcome from '../containers/Welcome'
import Game from '../containers/Game'
import Configuration from '../containers/Configuration'

const style={
    backgroundColor: '#eee'
}

class App extends React.Component{
    render(){
        return(
            <div style={style} >
                <Route exact={true} path="/" component={Welcome} />
                <Route exact={true} path="/game" component={Game} />
                <Route exact={true} path="/configuration" component={Configuration} />

            </div>
        )
    }
}

export default App