import * as History from 'history'
import { match } from 'react-router-dom'

export interface IRouterProps {
  history: History.History
  location: History.Location
  match: match
}
