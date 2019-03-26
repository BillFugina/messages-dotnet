import { IRouterProps } from 'src/types/router'
import logo from 'src/logo.svg'
import React from 'react'

interface IComponentOwnProps {}

interface IComponentProps extends IComponentOwnProps, IRouterProps {}

export const ChannelView: React.SFC<IComponentProps> = props => {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          {props.match.path}
        </a>
      </header>
    </div>
  )
}
