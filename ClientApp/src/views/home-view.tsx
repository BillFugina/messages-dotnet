import { ApplicationActions } from 'src/application-actions'
import { Button, Col, Container, FormControl, InputGroup, Row } from 'react-bootstrap'
import { IFormEvent } from 'src/types/react-bootstrap'
import { useApplicationState } from 'src/application-state'
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
    <Container>
      <Row>
        <Col>{locationPath}</Col>
      </Row>
      <Row>
        <Col>
          <InputGroup>
            <FormControl type='input' placeholder='Channel Name' value={channelName} onChange={handleTextChange} />
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={handleButtonClick}>Open Channel</Button>
        </Col>
      </Row>
    </Container>
  )
}
