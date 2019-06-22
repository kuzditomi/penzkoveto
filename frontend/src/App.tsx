import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { appReducer, defaultState } from './app.reducer';
import { Provider } from 'react-redux';
import Main from './Main/Main';
import { loadUser } from './token-validate.actions';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { grey, amber } from '@material-ui/core/colors'

const store = createStore(appReducer, defaultState(), applyMiddleware(thunk));
store.dispatch(loadUser() as any);

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: grey[800]
    },
    primary: {
      main: amber[500]
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '"Lato"',
      'sans-serif'
    ].join(',')
  }
});

const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Main />
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;