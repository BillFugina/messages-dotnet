import { Channel } from 'pusher-js'
import { IPusherOptions, IPusherSendMessage, PusherReducer } from 'src/types/pusher'
import { pusherContext } from 'src/context/pusher-context'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'

const defaultPusherOptions: IPusherOptions = {
  privateChannel: false
}

const usePusher = <TState, TMessageFormat>(
  channelName: string,
  eventName: string,
  reducer: PusherReducer<TState, TMessageFormat>,
  initialState: TState,
  options: IPusherOptions = defaultPusherOptions
): [TState, IPusherSendMessage<TMessageFormat>] => {
  const finalChannelName = `${options.privateChannel ? 'private-' : ''}${channelName}`
  const clientEventName = `client-${eventName}`

  const channel = useRef<Channel>()
  const pusher = useContext(pusherContext)
  const [state, setState] = useState(initialState)

  const messageHandler = useCallback(
    (message: TMessageFormat) => {
      const newState = reducer(state, message)
      setState(newState)
    },
    [state]
  )

  useEffect(() => {
    channel.current = pusher.subscribe(finalChannelName)
    channel.current.bind(eventName, messageHandler)
    channel.current.bind(clientEventName, messageHandler)

    return () => {
      if (channel.current) {
        channel.current.unbind(clientEventName, messageHandler)
        channel.current.unbind(eventName, messageHandler)
      }
    }
  }, [])

  const sendMessage: IPusherSendMessage<TMessageFormat> = (message: TMessageFormat, selfProcess?: boolean) => {
    if (!options.privateChannel) {
      throw `Can only send messages over a private channel. This channel is not private`
    } else {
      if (channel.current) {
        channel.current.trigger(clientEventName, message)
      }
      if (selfProcess) {
        const newState = reducer(state, message)
        setState(newState)
      }
    }
  }

  return [state, sendMessage]
}

export { usePusher }
