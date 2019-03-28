export type IActionCreators<T> = { [K in keyof T]: (...args: any[]) => { type: K; payload: T[K] } }

export type IActions<T> = { [K in keyof T]: { type: K; payload: T[K] } }

export type IActionsMap<T> = IActions<T>
export type IAction<T> = IActionsMap<T>[keyof IActionsMap<T>]
