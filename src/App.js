import React, { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import Dashboard from './pages/Dashboard'
import Voters from './pages/Voters'
import Nominees from './pages/Nominees'
import Votes from './pages/Votes'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Footer from './pages/Footer'
import LeftLayout from './components/LeftLayout'
import PrivateRoute from './components/PrivateRoute'
import store from './redux/store'
import { setAuthToken } from './utils'
import { getCurrentUser } from './redux/actions/user'
import Navbar from './components/Navbar'

if (localStorage.getItem('x-auth-token')) {
  setAuthToken(localStorage.getItem('x-auth-token'))
}

const App = () => {
  const [showLayout, setShowLayout] = useState(true)

  useEffect(() => {
    store.dispatch(getCurrentUser())
  }, [])

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/login' component={Login} />
          <div className='voting'>
            {showLayout && <LeftLayout />}
            <div className='voting__right'>
              <Navbar showLayout={showLayout} setShowLayout={setShowLayout} />
              <Switch>
                <PrivateRoute exact path='/' component={Dashboard} />
                <PrivateRoute exact path='/voters' component={Voters} />
                <PrivateRoute exact path='/nominees' component={Nominees} />
                <PrivateRoute exact path='/votes' component={Votes} />
                <Route component={NotFound} />
              </Switch>
              <Footer />
            </div>
          </div>
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App
