import React from 'react'
import {Switch,Route} from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Kelas from './pages/kelas'
import Siswa from './pages/siswa'
import Proses from './pages/proses'
import History from './pages/history'
import Admin from './pages/admin'

export default class App extends React.Component{
  
  render(){
    return(
      <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/login' component={Login}/>
      <Route path='/kelas' component={Kelas}/>
      <Route path='/siswa' component={Siswa}/>
      <Route path='/proses' component={Proses}/>
      <Route path='/history' component={History}/>
      <Route path='/admin' component={Admin}/>
     </Switch>
    )
  }
}
