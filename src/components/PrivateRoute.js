import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({
  component: Component,
  user: { isAdmin, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isAdmin && loading ? <Redirect to='/login' /> : <Component {...props} />
    }
  />
)

const mapStateToProps = (state) => ({
  user: state.user,
})

export default connect(mapStateToProps)(PrivateRoute)
