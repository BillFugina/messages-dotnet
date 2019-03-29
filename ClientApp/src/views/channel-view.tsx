import { ApplicationActions } from 'src/application-actions'
import { Badge, Button, Container, FormControl, InputGroup, Row } from 'react-bootstrap'
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

type IChannelMessage = {
  user: string
  message: string
}

type IChannelActionPayloadMap = {
  noop: undefined
  text: IChannelMessage
}

type IChannelAction = IAction<IChannelActionPayloadMap>

const ChannelActions: IActionCreators<IChannelActionPayloadMap> = {
  noop: () => ({ type: 'noop', payload: undefined }),
  text: (payload: { message: string; user: string }) => ({ type: 'text', payload })
}

type IChannelState = {
  channelMessage?: IChannelMessage
}

const defaultChannelState: IChannelState = {}

const ChannelReducer: IReducer<IChannelState, IChannelAction> = (state, action) => {
  switch (action.type) {
    case 'text': {
      return { ...state, channelMessage: action.payload }
    }
    case 'noop':
    default:
      return state
  }
}
export const ChannelView: React.SFC<IComponentProps> = () => {
  const [{ channelName, nick }, dispatch] = useApplicationState()
  const [messageState, sendMessage, changeChannel] = usePusher(ChannelReducer, defaultChannelState, {
    initialChannelName: channelName,
    initialEventName: 'messages',
    privateChannel: true
  })
  const [inputText, setInputText] = useState<string>('')
  const [messages, setMessages] = useState<IChannelMessage[]>([])

  const handleTextChange = useCallback((event: IFormEvent<'input'>) => {
    event.persist
    setInputText(event.currentTarget.value || '')
  }, [])

  const handleButtonClick = useCallback(() => {
    if (nick) {
      sendMessage(ChannelActions.text({ user: nick, message: inputText }), true)
      setInputText('')
    }
  }, [inputText])

  useEffect(() => {
    if (!channelName || channelName === '') {
      dispatch(ApplicationActions.changePath('/'))
    } else {
      changeChannel(channelName)
    }
  }, [channelName])

  useEffect(() => {
    if (messageState.channelMessage && (messages.length === 0 || messages[0] !== messageState.channelMessage)) {
      const newMessages = [messageState.channelMessage, ...messages]
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
        {messages.map((m, index) =>
          m.user !== nick ? (
            <Row key={index} className='chat-other'>
              <div className='pr-2'>
                <h6>
                  <span>{m.user}</span>
                </h6>
              </div>
              <div>
                <h5>
                  <Badge variant='light'>{m.message}</Badge>
                </h5>
              </div>
            </Row>
          ) : (
            <Row key={index} className='chat-self'>
              <div className='pl-2'>
                <h6>
                  <span>{m.user}</span>
                </h6>
              </div>
              <div>
                <h5>
                  <Badge variant='light'>{m.message}</Badge>
                </h5>
              </div>
            </Row>
          )
        )}
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
