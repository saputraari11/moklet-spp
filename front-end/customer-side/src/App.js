import React from 'react'
import {Switch,Route} from 'react-router-dom'
import Login from './pages/login'
import History from './pages/history'

export default class App extends React.Component{
  
  render(){
    return(
      <Switch>
      <Route path='/login' component={Login}/>
      <Route path='/' component={History}/>
     </Switch>
    )
  }
}
