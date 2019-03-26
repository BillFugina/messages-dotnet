export type IPusherSendMessage<TMessageFormat> = (message: TMessageFormat, selfProcess?: boolean) => void
export type PusherReducer<TState, TMessageFormat> = (state: TState, message: TMessageFormat) => TState
export interface IPusherOptions {
  initialChannelName?: string
  initialEventName?: string
  privateChannel?: boolean
}
