import { createContext } from 'react'
import { IDispatcher } from 'src/types/state'

export type IApplicationContext<TState, TAction> = [TState, IDispatcher<TAction>]
export const ApplicationStateContext = createContext<any>({})
