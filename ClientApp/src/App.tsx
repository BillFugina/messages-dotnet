import 'src/App.css'
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ChannelView } from 'src/views/channel-view'
import { HomeView } from 'src/views/home-view'
import { IApplicationStateContextReducer } from 'src/context/application-state-context'
import { StateProvider } from 'src/context/application-state-context-provider'
import React from 'react'

interface IApplicationState {
  color: 'red' | 'blue'
}

interface IApplicationAction<T = any> {
  type: 'noop'
  payload: T
}

const initialApplicationState: IApplicationState = {
  color: 'red'
}

const applicationReducer: IApplicationStateContextReducer<IApplicationState, IApplicationAction> = (state, action) => {
  switch (action.type) {
    case 'noop':
    default:
      return state
  }
}

const App: React.SFC = () => {
  return (
    <StateProvider initialState={initialApplicationState} reducer={applicationReducer}>
      <Router>
        <Route exact={true} path='/' component={HomeView} />
        <Route path='/channel' component={ChannelView} />
      </Router>
    </StateProvider>
  )
}

export default App
