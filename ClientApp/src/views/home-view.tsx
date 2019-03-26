import { Button, Container, FormControl, InputGroup } from 'react-bootstrap'
import logo from 'src/logo.svg'
import React from 'react'

interface IComponentOwnProps {}

interface IComponentProps extends IComponentOwnProps {}

export const HomeView: React.SFC<IComponentProps> = () => {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          Learn React
        </a>
        <Container>
          <InputGroup>
            <FormControl placeholder='Channel Name' />
          </InputGroup>
          <Button>Open Chanel</Button>
        </Container>
      </header>
    </div>
  )
}
