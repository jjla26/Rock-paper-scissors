import React from 'react'
import { Route } from 'react-router-dom'
import Welcome from '../containers/Welcome'

const style={
    backgroundColor: '#eee'
}

class App extends React.Component{
    render(){
        return(
            <div style={style} >
                <Route exact={true} path="/" component={Welcome} />
            </div>
        )
    }
}

export default App