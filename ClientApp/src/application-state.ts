import { ApplicationStateContext, IApplicationContext } from 'src/context/application-state-context'
import { IApplicationAction } from 'src/application-actions'
import { IReducer } from 'src/types/state'
import { useContext } from 'react'

export interface IApplicationState {
  locationPath?: string
  channelName?: string
}

export const initialApplicationState: IApplicationState = {}

export const useApplicationState = () => {
  const context = useContext<IApplicationContext<IApplicationState, IApplicationAction>>(ApplicationStateContext)
  return context
}

export const applicationReducer: IReducer<IApplicationState, IApplicationAction> = (state, action) => {
  switch (action.type) {
    case 'changePath':
      return { ...state, locationPath: action.payload }
    case 'changeChannel':
      return { ...state, locationPath: '/channel', channelName: action.payload }
    case 'noop':
    default:
      return state
  }
}
