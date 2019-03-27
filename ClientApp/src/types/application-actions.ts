export type IApplicationActionType = 'noop' | 'change-path' | 'change-other-path'

export interface IBaseApplicationAction<TActionType extends IApplicationActionType, TPayload> {
  type: TActionType
  payload: TPayload
}

export type INoOpApplicationAction = IBaseApplicationAction<'noop', undefined>
export const NoOpApplicationAction = (): INoOpApplicationAction => ({
  type: 'noop',
  payload: undefined
})

export type IChangeLocationPathApplicationAction = IBaseApplicationAction<'change-path', string>
export const ChangeLocationPathApplicationAction = (path: string): IChangeLocationPathApplicationAction => ({
  type: 'change-path',
  payload: path
})

export type IChangeOtherPathApplicationAction = IBaseApplicationAction<'change-other-path', string>
export const ChangeOtherPathApplicationAction = (path: string): IChangeOtherPathApplicationAction => ({
  type: 'change-other-path',
  payload: path
})

export type IApplicationAction =
  | INoOpApplicationAction
  | IChangeLocationPathApplicationAction
  | IChangeOtherPathApplicationAction
