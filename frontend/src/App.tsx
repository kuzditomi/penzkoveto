import React from 'react';
import './App.scss';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { appReducer, defaultState } from './app.reducer';
import { Provider } from 'react-redux';
import Main from './Main/Main';
import { loadUser } from './token-validate.actions';
import Menu from './Menu/Menu';

const store = createStore(appReducer, defaultState(), applyMiddleware(thunk));
store.dispatch(loadUser() as any);

const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Menu/>
        <Main/>
      </Provider>
    </div>
  );
}

export default App;