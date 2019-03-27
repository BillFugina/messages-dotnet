import { BsPrefixProps, ReplaceProps } from 'react-bootstrap/helpers'
import { FormControlProps } from 'react-bootstrap'
import React from 'react'
export type IFormEvent<T extends React.ReactType> = React.FormEvent<
  ReplaceProps<T, BsPrefixProps<T> & FormControlProps>
>
