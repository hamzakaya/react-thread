import React, { useEffect } from 'react'
// @ts-ignore
import HesaplaWorker from 'comlink-loader!../../workers/hesapla.worker'
import { Suspendable, useSuspendableData } from 'react-suspendable-contract'
import { ErrorBoundary } from '../atom/ErrorBoundary'
import VirtualList from '../molecules/VirtualList'
import Loading from '../atom/Loading'
import HesaplamaSonuc from '../atom/HesaplamaSonuc'
import HesaplamaErrorMessage from '../atom/HesaplamaErrorMessage'
import { listItemStyle, TabContentProps } from '../type-utils'

// https://github.com/GoogleChromeLabs/comlink-loader/pull/27
function TabContent({ index, base, pow, style }: TabContentProps) {
  const suspendableData = useSuspendableData<number>(async () => {
    const worker = new HesaplaWorker()
    return worker.hesapla(base, pow)
  }, [base, pow])

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

export default function ListDedicatedWorker() {
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
