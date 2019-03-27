import {
  ApplicationStateContext,
  IApplicationContext,
  IApplicationStateContextReducer
} from 'src/context/application-state-context'
import { IApplicationAction } from 'src/application-actions'
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

export const applicationReducer: IApplicationStateContextReducer<IApplicationState, IApplicationAction> = (
  state,
  action
) => {
  switch (action.type) {
    case 'change-path':
      return { ...state, locationPath: action.payload }
    case 'change-channel':
      return { ...state, locationPath: '/channel', channelName: action.payload }
    case 'noop':
    default:
      return state
  }
}
