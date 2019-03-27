export type IApplicationActionType = 'noop' | 'change-path' | 'change-channel'

export interface IBaseApplicationAction<TActionType extends IApplicationActionType, TPayload> {
  type: TActionType
  payload: TPayload
}

export type IApplicationAction =
  | INoOpApplicationAction
  | IChangeLocationPathApplicationAction
  | IChangeChannelApplicationAction

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

export type IChangeChannelApplicationAction = IBaseApplicationAction<'change-channel', string | undefined>
export const ChangeChannelApplicationAction = (channelName?: string): IChangeChannelApplicationAction => ({
  type: 'change-channel',
  payload: channelName
})
