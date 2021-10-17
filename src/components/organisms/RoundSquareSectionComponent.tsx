import { FC } from 'react'
import './RoundSquareSection.scss'

export interface IRoundSquareSection {
  bgColor?: string
}

export const RoundSquareSection: FC<IRoundSquareSection> = ({ bgColor = "", children }) => (
  <div style={{ backgroundColor:bgColor }} className='round-square-section-wrap'>
    {children}
  </div>
)
