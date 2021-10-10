import React, { useContext } from 'react'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { AutoSizer, List, ListRowRenderer } from 'react-virtualized'
import { AppCtx } from '../type-utils'

export default function VirtualList({
  headerComp,
  rowRendererProvider,
}: {
  headerComp?: () => JSX.Element
  rowRendererProvider: (base: number, pow: number) => ListRowRenderer
}) {
  const classes = useStyles()
  const appCtx = useContext(AppCtx)

  if (!appCtx) return null

  const { input } = appCtx
  const { base, pow } = input

  return (
    <div className={classes.root}>
      <Typography
        variant="h5"
        classes={{ displayBlock: 'block', alignCenter: 'true' }}
      >
        Örnek Liste {input.rowCount} <CircularProgress />
      </Typography>
      {headerComp && headerComp()}

      <p>Scroll yapıldıkça hesaplama yapılacak</p>
      <AutoSizer disableWidth>
        {({ height }) => (
          <List
            containerStyle={{
              width: '100%',
              maxWidth: '100%',
            }}
            style={{
              width: '100%',
              textAlign: 'left',
            }}
            width={1}
            height={300}
            rowCount={input.rowCount}
            rowHeight={30}
            rowRenderer={rowRendererProvider(base, pow)}
          />
        )}
      </AutoSizer>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: 400,
      // maxWidth: 300,
      backgroundColor: theme.palette.background.paper,
    },
  }),
)
