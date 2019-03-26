import { createContext, useContext } from 'react'

export type IApplicationStateContextReducer<TState, TAction> = (state: TState, action: TAction) => TState

export const ApplicationStateContext = createContext<any>({})

export const useApplicationState = <TState>() => useContext<TState>(ApplicationStateContext)
