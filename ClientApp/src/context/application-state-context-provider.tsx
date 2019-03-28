import { ApplicationStateContext } from 'src/context/application-state-context'
import { IReducer } from 'src/types/state'
import React, { useReducer } from 'react'

interface IComponentProps<TState, TAction> {
  reducer: IReducer<TState, TAction>
  initialState: TState
  children: JSX.Element
}

export const StateProvider: React.SFC<IComponentProps<any, any>> = <TState, TAction>(
  props: IComponentProps<TState, TAction>
) => {
  const { reducer, initialState, children } = props

  return (
    <ApplicationStateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </ApplicationStateContext.Provider>
  )
}
