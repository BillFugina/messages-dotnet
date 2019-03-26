import { Channel } from 'pusher-js'
import { IPusherOptions, IPusherSendMessage, PusherReducer } from 'src/types/pusher'
import { pusherContext } from 'src/context/pusher-context'
import { useCallback, useContext, useEffect, useState } from 'react'

const defaultPusherOptions: IPusherOptions = {
  privateChannel: false
}

const usePusher = <TState, TMessageFormat>(
  reducer: PusherReducer<TState, TMessageFormat>,
  initialState: TState,
  options: IPusherOptions = defaultPusherOptions
): [
  TState,
  IPusherSendMessage<TMessageFormat>,
  React.Dispatch<React.SetStateAction<string | undefined>>,
  React.Dispatch<React.SetStateAction<string | undefined>>
] => {
  const [channel, setChannel] = useState<Channel | undefined>()
  const [channelName, setChannelName] = useState<string | undefined>(options.initialChannelName)
  const [eventName, setEventName] = useState<string | undefined>(options.initialEventName)

  const pusher = useContext(pusherContext)
  const [state, setState] = useState(initialState)

  const messageHandler = useCallback(
    (message: TMessageFormat) => {
      const newState = reducer(state, message)
      setState(newState)
    },
    [state]
  )

  const clientEventName = `client-${eventName}`

  useEffect(() => {
    const finalChannelName = `${options.privateChannel ? 'private-' : ''}${channelName}`

    if (channelName) {
      if (channel) {
        channel.unbind_all()
      }

      const newChannel = pusher.subscribe(finalChannelName)
      setChannel(newChannel)
    }

    return () => {
      if (channel) {
        pusher.unsubscribe(finalChannelName)
        setChannel(undefined)
      }
    }
  }, [channelName])

  useEffect(() => {
    if (channel && eventName) {
      channel.bind(eventName, messageHandler)
      channel.bind(clientEventName, messageHandler)
    }

    return () => {
      if (channel) {
        channel.unbind_all()
      }
    }
  }, [channel, eventName])

  const sendMessage: IPusherSendMessage<TMessageFormat> = (message: TMessageFormat, selfProcess?: boolean) => {
    if (!options.privateChannel) {
      throw `Can only send messages over a private channel. This channel is not private.`
    } else if (channel && eventName) {
      channel.trigger(clientEventName, message)
      if (selfProcess) {
        const newState = reducer(state, message)
        setState(newState)
      }
    }
  }

  return [state, sendMessage, setChannelName, setEventName]
}

export { usePusher }
