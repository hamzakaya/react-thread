import React, { useMemo } from 'react'
import { hesapla } from '../../workers/hesapla'
import VirtualList from '../molecules/VirtualList'
import Loading from '../atom/Loading'
import HesaplamaSonuc from '../atom/HesaplamaSonuc'
import { listItemStyle, TabContentProps } from '../type-utils'

function TabContent({ index, base, pow, style, isScrolling }: TabContentProps) {
  const result = isScrolling ? (
    <Loading index={index} />
  ) : (
    useMemo(() => {
      const result = hesapla(base, pow)
      return (
        <HesaplamaSonuc index={index} base={base} pow={pow} result={result} />
      )
    }, [base, pow])
  )
  return <p style={{ ...style, ...listItemStyle }}>{result}</p>
}

export default function ListBlocking() {
  return (
    <VirtualList
      rowRendererProvider={(base, pow) =>
        ({ key, index, style, isScrolling }) =>
          (
            <TabContent
              key={key}
              index={index}
              base={base}
              pow={pow}
              style={style}
              isScrolling={isScrolling}
            />
          )}
    />
  )
}
