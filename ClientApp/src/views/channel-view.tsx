import { Alert, Button, Container, FormControl, InputGroup } from 'react-bootstrap'
import { ApplicationActions } from 'src/application-actions'
import { IAction, IActionCreators } from 'src/types/actions'
import { IFormEvent } from 'src/types/react-bootstrap'
import { IReducer } from 'src/types/state'
import { IRouterProps } from 'src/types/router'
import { Navbar } from 'react-bootstrap'
import { useApplicationState } from 'src/application-state'
import { usePusher } from 'src/hooks/pusher-hook'
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
  const [{ channelName, nick }, dispatch] = useApplicationState()
  const [messageState, sendMessage] = usePusher(ChannelReducer, defaultChannelState, {
    initialChannelName: channelName,
    initialEventName: 'messages',
    privateChannel: true
  })
  const [inputText, setInputText] = useState<string>('')
  const [messages, setMessages] = useState<string[]>([])

  const handleTextChange = useCallback((event: IFormEvent<'input'>) => {
    event.persist
    setInputText(event.currentTarget.value || '')
  }, [])

  const handleButtonClick = useCallback(() => {
    sendMessage(ChannelActions.text(inputText), true)
    setInputText('')
  }, [inputText])

  useEffect(() => {
    if (!channelName || channelName === '') {
      dispatch(ApplicationActions.changePath('/'))
    }
  }, [channelName])

  useEffect(() => {
    if (messageState.messageText && (messages.length === 0 || messages[0] !== messageState.messageText)) {
      const newMessages = [messageState.messageText, ...messages]
      setMessages(newMessages)
    }
  }, [messageState, messages])

  return (
    <>
      <Navbar bg='dark' variant='dark' fixed='top' className='justify-content-start'>
        <Container className='justify-content-start'>
          <Navbar.Text className='px-2'>
            Channel: <a>{channelName}</a>
          </Navbar.Text>
          <Navbar.Text className='px-2'>
            Nick: <a>{nick}</a>
          </Navbar.Text>
        </Container>
      </Navbar>

      <div className='container chat-container'>
        {messages.map((m, index) => (
          <Alert key={index} variant='primary'>
            {m}
          </Alert>
        ))}
      </div>

      <Navbar bg='dark' variant='dark' fixed='bottom'>
        <Container>
          <InputGroup>
            <FormControl type='input' placeholder='Message Text' value={inputText} onChange={handleTextChange} />
            <InputGroup.Append>
              <Button onClick={handleButtonClick}>Send Message</Button>
            </InputGroup.Append>
          </InputGroup>
        </Container>
      </Navbar>
    </>
  )
}
