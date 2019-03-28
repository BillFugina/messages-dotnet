import { ApplicationActions } from 'src/application-actions'
import { Button, Container, FormControl, InputGroup } from 'react-bootstrap'
import { IAction, IActionCreators } from 'src/types/actions'
import { IFormEvent } from 'src/types/react-bootstrap'
import { IReducer } from 'src/types/state'
import { IRouterProps } from 'src/types/router'
import { useApplicationState } from 'src/application-state'
import { usePusher } from 'src/hooks/pusher-hook'
import logo from 'src/logo.svg'
import React, { useCallback, useEffect, useState } from 'react'

interface IComponentOwnProps {}

interface IComponentProps extends IComponentOwnProps, IRouterProps {}

type IChannelActionPayloadMap = {
  noop: undefined
  text: string
}

type IChannelAction = IAction<IChannelActionPayloadMap>

const ChannelActions: IActionCreators<IChannelActionPayloadMap> = {
  noop: () => ({ type: 'noop', payload: undefined }),
  text: (text: string) => ({ type: 'text', payload: text })
}

type IChannelState = {
  messageText: string
}

const defaultChannelState = {
  messageText: ''
}

const ChannelReducer: IReducer<IChannelState, IChannelAction> = (state, action) => {
  switch (action.type) {
    case 'text': {
      return { ...state, messageText: action.payload }
    }
    case 'noop':
    default:
      return state
  }
}
export const ChannelView: React.SFC<IComponentProps> = () => {
  const [{ channelName }, dispatch] = useApplicationState()
  const [messageState, sendMessage] = usePusher(ChannelReducer, defaultChannelState, {
    initialChannelName: channelName,
    initialEventName: 'messages',
    privateChannel: true
  })
  const [inputText, setInputText] = useState<string>('')

  const handleTextChange = useCallback((event: IFormEvent<'input'>) => {
    event.persist
    setInputText(event.currentTarget.value || '')
  }, [])

  const handleButtonClick = useCallback(() => {
    sendMessage(ChannelActions.text(inputText), true)
  }, [inputText])

  useEffect(() => {
    if (!channelName || channelName === '') {
      dispatch(ApplicationActions.changePath('/'))
    }
  }, [channelName])

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          {messageState.messageText}
        </a>
        <Container>
          <InputGroup>
            <FormControl type='input' placeholder='Message Text' value={inputText} onChange={handleTextChange} />
          </InputGroup>
          <Button onClick={handleButtonClick}>Send Message</Button>
        </Container>
      </header>
    </div>
  )
}
