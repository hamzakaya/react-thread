import React, { useState } from 'react'
import { Box } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import { hot } from 'react-hot-loader'
import { hesapla } from '../workers/hesapla'
import CreateInput from './molecules/CreateInput'
import {
  ListBlocking,
  ListDedicatedWorker,
  ListSingleton,
  ListWorkerPool,
} from './organisms'
import { AppCtx, AppMode, InputModel } from './type-utils'

export const FonksiyonuGoster = () => (
  <Box px={2}>
    <pre>
      <p>Uzun süren bir fonksiyon örneği.</p>
      {String(`function hesapla(sayi, uzeri) {
    var result = 0;
    var i = 0;
    var len = Math.pow(sayi, uzeri);
    while (i < len) {
        result += Math.sin(i) * Math.sin(i) + Math.cos(i) * Math.cos(i);
        i++;
    }
    return result;
}`)}
    </pre>
  </Box>
)

export const ModeSwitcher = ({ mode }: { mode: AppMode }) => (
  <>
    {mode === AppMode.blocking && <ListBlocking />}
    {mode === AppMode.webWorkerSingleton && <ListSingleton />}
    {mode === AppMode.webWorkerDedicated && <ListDedicatedWorker />}
    {mode === AppMode.webWorkerPool && <ListWorkerPool />}
  </>
)

export const Header = () => (
  <>
    <h1>
      UI Thread <CircularProgress />
    </h1>
    <Box>
      <p>
        <i>
          * Loadingler, UI engelleme oluşumunu görsel olarak izlemek içindir
        </i>
      </p>
    </Box>
    <p>
      <b>arayüzü engellemesini</b> görmek için parametreleri ayarlamaya
      başlayın!
    </p>
    <CreateInput />
  </>
)
