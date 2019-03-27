import { createContext } from 'react'

export type IApplicationStateContextReducer<TState, TAction> = (state: TState, action: TAction) => TState
export type IApplicationStateDispatcher<TAction> = (action: TAction) => void
export type IApplicationContext<TState, TAction> = [TState, IApplicationStateDispatcher<TAction>]
export const ApplicationStateContext = createContext<any>({})
