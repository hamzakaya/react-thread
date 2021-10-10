import React from 'react'
import { HesaplamaSonucProps } from '../type-utils'

const HesaplamaSonuc = ({ index, base, pow, result }: HesaplamaSonucProps) => (
  <span>
    {index}. hesapla({base}, {pow}) = {result}
  </span>
)

export default HesaplamaSonuc
