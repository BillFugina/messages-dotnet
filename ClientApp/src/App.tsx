import 'bootstrap/dist/css/bootstrap.css'
import 'src/App.css'
import { ApplicationActions } from 'src/application-actions'
import { applicationReducer, initialApplicationState, useApplicationState } from 'src/application-state'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ChannelView } from 'src/views/channel-view'
import { HomeView } from 'src/views/home-view'
import { IRouterProps } from 'src/types/router'
import { StateProvider } from 'src/context/application-state-context-provider'
import React, { useEffect } from 'react'

interface IWrapperProps extends IRouterProps {}

const WrapperRoute: React.SFC<IWrapperProps> = props => {
  const { location, history } = props
  const [{ locationPath }, dispatch] = useApplicationState()

  useEffect(() => {
    if (locationPath !== location.pathname) {
      dispatch(ApplicationActions.changePath(location.pathname))
    }
  }, [location.pathname])

  useEffect(() => {
    if (locationPath && location.pathname !== locationPath) {
      history.push(locationPath)
    }
  }, [locationPath])

  return null
}

const App: React.SFC = () => {
  return (
    <div className='App'>
      <StateProvider initialState={initialApplicationState} reducer={applicationReducer}>
        <Router>
          <Route path='/' component={WrapperRoute} />
          <Route exact={true} path='/' component={HomeView} />
          <Route path='/channel' component={ChannelView} />
        </Router>
      </StateProvider>
    </div>
  )
}

export default App
