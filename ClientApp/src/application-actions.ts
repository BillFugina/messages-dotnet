import { IAction, IActionCreators } from 'src/types/actions'

export type IApplicationActionPayloadMap = {
  noop: undefined
  changePath: string
  changeChannel: string
}

export type IApplicationActionType = keyof IApplicationActionPayloadMap
export type IApplicationAction = IAction<IApplicationActionPayloadMap>

export const ApplicationActions: IActionCreators<IApplicationActionPayloadMap> = {
  noop: () => ({
    type: 'noop',
    payload: undefined
  }),
  changePath: (path: string) => ({
    type: 'changePath',
    payload: path
  }),
  changeChannel: (channelName: string) => ({
    type: 'changeChannel',
    payload: channelName
  })
}
