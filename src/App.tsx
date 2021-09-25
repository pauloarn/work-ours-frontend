import React from 'react';
import Routes from './routes'
import './styles/global.css'
import { Provider } from 'react-redux'
import store from './store'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from "@date-io/date-fns"

function App() {
  return (
    <Provider store={store}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Routes />
      </MuiPickersUtilsProvider>
    </Provider>
  )
}

export default App