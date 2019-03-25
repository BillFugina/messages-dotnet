import 'src/App.css'
import 'bootstrap/dist/css/bootstrap.css'
import { BsPrefixProps, ReplaceProps } from 'react-bootstrap/helpers'
import { Button, Container, FormControl, FormControlProps, InputGroup } from 'react-bootstrap'
import { PusherReducer } from 'src/types/pusher'
import { usePusher } from 'src/hooks/pusher-hook'
import logo from 'src/logo.svg'
import React, { useCallback, useState } from 'react'

type IMessageFormat = {
  type: 'text' | 'client-text'
  body: string
}

type IMessageState = {
  messageText: string
}

const reducer: PusherReducer<IMessageState, IMessageFormat> = (state, message) => {
  return { ...state, messageText: message.body }
}

const initialState: IMessageState = {
  messageText: 'hello world'
}

const App: React.SFC = () => {
  const [messageState, sendMessage] = usePusher('messages', 'text', reducer, initialState, { privateChannel: true })
  const [messageText, setMessageText] = useState<string>('')

  const handleTextChange = useCallback(
    (event: React.FormEvent<ReplaceProps<'input', BsPrefixProps<'input'> & FormControlProps>>) => {
      event.persist
      setMessageText(event.currentTarget.value || '')
    },
    []
  )

  const handleButtonClick = useCallback(() => {
    sendMessage({ type: 'text', body: messageText }, true)
  }, [messageText])

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>{messageState.messageText}</p>
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          Learn React
        </a>
        <Container>
          <InputGroup>
            <FormControl placeholder='message text' onChange={handleTextChange} value={messageText} />
          </InputGroup>
          <Button onClick={handleButtonClick}>Send Message</Button>
        </Container>
      </header>
    </div>
  )
}

export default App
