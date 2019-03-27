import { ChannelView } from 'src/views/channel-view'
import 'bootstrap/dist/css/bootstrap.css'
import {
  ApplicationStateContext,
  IApplicationContext,
  IApplicationStateContextReducer
} from 'src/context/application-state-context'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ChangeLocationPathApplicationAction, IApplicationAction } from 'src/types/application-actions'
import 'src/App.css'
import { HomeView } from 'src/views/home-view'
import { IApplicationState } from 'src/types/application-state'
import { IRouterProps } from 'src/types/router'
import { StateProvider } from 'src/context/application-state-context-provider'
import React, { useContext, useEffect } from 'react'

const initialApplicationState: IApplicationState = {
  color: 'red',
  locationPath: undefined,
  otherPath: undefined
}

const applicationReducer: IApplicationStateContextReducer<IApplicationState, IApplicationAction> = (state, action) => {
  switch (action.type) {
    case 'change-path':
      return { ...state, locationPath: action.payload }
    case 'change-other-path':
      return { ...state, otherPath: action.payload }
    case 'noop':
    default:
      return state
  }
}

export const useApplicationState = () => {
  const context = useContext<IApplicationContext<IApplicationState, IApplicationAction>>(ApplicationStateContext)
  return context
}

interface IWrapperProps extends IRouterProps {}

const WrapperRoute: React.SFC<IWrapperProps> = props => {
  const { location, history } = props
  const [{ locationPath }, dispatch] = useApplicationState()

  useEffect(() => {
    if (locationPath !== location.pathname) {
      dispatch(ChangeLocationPathApplicationAction(location.pathname))
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
    <StateProvider initialState={initialApplicationState} reducer={applicationReducer}>
      <Router>
        <Route path='/' component={WrapperRoute} />
        <Route exact={true} path='/' component={HomeView} />
        <Route path='/channel' component={ChannelView} />
      </Router>
    </StateProvider>
  )
}

export default App
