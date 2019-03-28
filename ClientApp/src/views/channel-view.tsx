import { ApplicationActions } from 'src/application-actions'
import { Button, Col, Container, FormControl, InputGroup, Row } from 'react-bootstrap'
import { IAction, IActionCreators } from 'src/types/actions'
import { IFormEvent } from 'src/types/react-bootstrap'
import { IReducer } from 'src/types/state'
import { IRouterProps } from 'src/types/router'
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
    <Container>
      <Row>
        <Col>{messageState.messageText}</Col>
      </Row>
      <Row>
        <Col>
          <InputGroup>
            <FormControl type='input' placeholder='Message Text' value={inputText} onChange={handleTextChange} />
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={handleButtonClick}>Send Message</Button>
        </Col>
      </Row>
    </Container>
  )
}
