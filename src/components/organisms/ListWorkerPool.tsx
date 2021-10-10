import React, { useMemo, useState } from 'react'
// @ts-ignore
import HesaplaWorker from 'comlink-loader!../../workers/hesapla.worker'
import { Suspendable, useSuspendableData } from 'react-suspense-data'
import TextField from '@material-ui/core/TextField'
import VirtualList from '../molecules/VirtualList'
import {
  ErrorBoundary,
  Loading,
  HesaplamaSonuc,
  HesaplamaErrorMessage,
} from '../atom'
import { listItemStyle, TabContentProps } from '../type-utils'

interface TabProps extends TabContentProps {
  worker: HesaplaWorker
}

function TabContent({ index, base, pow, style, worker }: TabProps) {
  const suspendableData = useSuspendableData<number>(
    () => worker.hesapla(base, pow),
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

export default function ListWorkerPool() {
  const [poolSize, setPoolSize] = useState(4)

  const workerPool = useMemo(
    () => new Array(poolSize).fill(null).map(() => new HesaplaWorker()),
    [poolSize],
  )

  return (
    <>
      <VirtualList
        headerComp={() => (
          <div
            style={{
              position: 'relative',
              float: 'left',
              top: '-65px',
              width: '100px',
            }}
          >
            <TextField
              id="poolCount"
              label="Worker Pool Sayısı"
              required
              type="number"
              variant="outlined"
              defaultValue={poolSize}
              inputProps={{ step: 1 }}
              onChange={(event: React.ChangeEvent<{ value: string }>) => {
                setPoolSize(Number(event.target.value))
              }}
            />
          </div>
        )}
        rowRendererProvider={(base, pow) =>
          ({ key, index, style }) =>
            (
              <TabContent
                key={key}
                index={index}
                base={base}
                pow={pow}
                style={style}
                worker={workerPool[index % poolSize]}
              />
            )}
      />
    </>
  )
}
