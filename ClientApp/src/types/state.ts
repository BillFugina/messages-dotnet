export type IReducer<TState, TAction> = (state: TState, action: TAction) => TState
export type IDispatcher<TAction> = (action: TAction) => void
