import React, { Dispatch, ReactNode, SetStateAction } from 'react'

export interface InputModel {
  base: number
  pow: number
  rowCount: number
}

export enum AppMode {
  blocking,
  webWorkerSingleton,
  webWorkerDedicated,
  webWorkerPool,
}

export const AppCtx = React.createContext<{
  input: InputModel
  setInput: Dispatch<SetStateAction<InputModel>>
  mode: AppMode
  setMode: Dispatch<SetStateAction<AppMode>>
} | null>(null)

export interface ErrorBoundaryProps {
  fallback: ReactNode
}

export interface HesaplamaErrorMessageProps {
  index: number
  base: number
  pow: number
}
export interface HesaplamaSonucProps {
  index: number
  base: number
  pow: number
  result: number
}

export interface TabContentProps {
  index: number
  base: number
  pow: number
  style: React.CSSProperties
  isScrolling?: boolean
}

export const listItemStyle = {
  borderBottom: '1px solid rgb(51 51 51 / 28%)',
  padding: '10px 10px 5px',
  lineHeight: '40px',
}
