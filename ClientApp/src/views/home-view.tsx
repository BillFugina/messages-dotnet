import { ApplicationActions } from 'src/application-actions'
import { Button, Container, Form } from 'react-bootstrap'
import { IFormEvent } from 'src/types/react-bootstrap'
import { useApplicationState } from 'src/application-state'
import React, { useCallback, useState } from 'react'

interface IComponentOwnProps {}

interface IComponentProps extends IComponentOwnProps {}

export const HomeView: React.SFC<IComponentProps> = () => {
  const [{}, dispatch] = useApplicationState()
  const [channelName, setChannelName] = useState<string>('')
  const [nick, setNick] = useState<string>('')
  const [validated, setValidated] = useState(false)

  const handleChannelTextChange = useCallback((event: IFormEvent<'input'>) => {
    event.persist
    setChannelName(event.currentTarget.value || '')
  }, [])

  const handleNickTextChange = useCallback((event: IFormEvent<'input'>) => {
    event.persist
    setNick(event.currentTarget.value || '')
  }, [])

  const handleButtonClick = useCallback(() => {
    if (channelName !== '' && nick !== '') {
      dispatch(ApplicationActions.openChannel(channelName))
    } else {
      setValidated(true)
    }
  }, [channelName, nick])

  return (
    <Container>
      <Form validated={validated}>
        <Form.Group>
          <Form.Label>Channel Name</Form.Label>
          <Form.Control size='sm' type='input' value={channelName} onChange={handleChannelTextChange} required={true} />
          <Form.Control.Feedback type='invalid'>Channel Name is required</Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Nick Name</Form.Label>
          <Form.Control size='sm' type='input' value={nick} onChange={handleNickTextChange} required={true} />
          <Form.Control.Feedback type='invalid'>Nick Name is required</Form.Control.Feedback>
        </Form.Group>
        <Button onClick={handleButtonClick}>Open Channel</Button>
      </Form>
    </Container>
  )
}
