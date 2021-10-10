import React from 'react'
import { HesaplamaErrorMessageProps } from '../type-utils'

const HesaplamaErrorMessage = ({
  index,
  base,
  pow,
}: HesaplamaErrorMessageProps) => (
  <span>
    {index}. yüklenemedi {base},{pow}
  </span>
)

export default HesaplamaErrorMessage
