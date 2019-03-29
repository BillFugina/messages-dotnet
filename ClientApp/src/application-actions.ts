import { IAction, IActionCreators } from 'src/types/actions'

type IApplicationActionPayloadMap = {
  noop: undefined
  changePath: string
  openChannel: {
    channelName: string
    nick: string
  }
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
  openChannel: (payload: { channelName: string; nick: string }) => ({
    type: 'openChannel',
    payload
  })
}
