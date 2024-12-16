import * as React from 'react'

export interface LabelInterface{
  /** An element type to render as (string or function). */
  as?: any

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  styDetail?:any

  lblName:string

  width?: string

  height?: any
  
}

declare const Label:React.FC<LabelInterface>

export default Label;