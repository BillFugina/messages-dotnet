import { ApplicationActions } from 'src/application-actions'
import { Button, Container, FormControl, InputGroup } from 'react-bootstrap'
import { IFormEvent } from 'src/types/react-bootstrap'
import { useApplicationState } from 'src/application-state'
import logo from 'src/logo.svg'
import React, { useCallback, useState } from 'react'

interface IComponentOwnProps {}

interface IComponentProps extends IComponentOwnProps {}

export const HomeView: React.SFC<IComponentProps> = () => {
  const [{ locationPath }, dispatch] = useApplicationState()
  const [channelName, setChannelName] = useState<string>('')

  const handleTextChange = useCallback((event: IFormEvent<'input'>) => {
    event.persist
    setChannelName(event.currentTarget.value || '')
  }, [])

  const handleButtonClick = useCallback(() => {
    dispatch(ApplicationActions.changeChannel(channelName))
  }, [channelName])

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          {locationPath}
        </a>
        <Container>
          <InputGroup>
            <FormControl type='input' placeholder='Channel Name' value={channelName} onChange={handleTextChange} />
          </InputGroup>
          <Button onClick={handleButtonClick}>Open Channel</Button>
        </Container>
      </header>
    </div>
  )
}
