import React from 'react'
import { hesapla } from '../../workers/hesapla.worker.singleton'
import { Suspendable, useSuspendableData } from 'react-suspendable-contract'
import { ErrorBoundary } from '../atom/ErrorBoundary'
import VirtualList from '../molecules/VirtualList'
import Loading from '../atom/Loading'
import HesaplamaSonuc from '../atom/HesaplamaSonuc'
import HesaplamaErrorMessage from '../atom/HesaplamaErrorMessage'
import { listItemStyle, TabContentProps } from '../type-utils'

function TabContent({ index, base, pow, style }: TabContentProps) {
  const suspendableData = useSuspendableData(
    () => hesapla(base, pow),
    [base, pow],
  )
  return (
    <p style={{ ...style, ...listItemStyle }}>
      <ErrorBoundary
        key={`${base}-${pow}`}
        fallback={<HesaplamaErrorMessage index={index} base={base} pow={pow} />}
      >
        <React.Suspense fallback={<Loading index={index} />}>
          <Suspendable data={suspendableData}>
            {(data) => (
              <HesaplamaSonuc
                index={index}
                base={base}
                pow={pow}
                result={data}
              />
            )}
          </Suspendable>
        </React.Suspense>
      </ErrorBoundary>
    </p>
  )
}

export default function ListSingleton() {
  return (
    <VirtualList
      rowRendererProvider={(base, pow) =>
        ({ key, index, style }) =>
          (
            <TabContent
              key={key}
              index={index}
              base={base}
              pow={pow}
              style={style}
            />
          )}
    />
  )
}
