import React, { useState } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { AppCtx, AppMode, InputModel } from './components/type-utils'
import { hot } from 'react-hot-loader'
import { FonksiyonuGoster, Header, ModeSwitcher } from './components'

function App() {
  const classes = useStyles()
  const [input, setInput] = useState<InputModel>({
    base: 50,
    pow: 3.14,
    rowCount: 300,
  })
  const [mode, setMode] = useState<AppMode>(AppMode.blocking)

  return (
    <AppCtx.Provider value={{ input, setInput, mode, setMode }}>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Header />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <FonksiyonuGoster />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <ModeSwitcher mode={mode} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </AppCtx.Provider>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
)

declare let module: Record<string, unknown>
export default hot(module)(App)
