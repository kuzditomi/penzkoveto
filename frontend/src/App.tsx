import React from 'react';
import './App.css';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { appReducer, defaultState } from './app.reducer';
import { Provider } from 'react-redux';
import Main from './Home/Main';
import { loadUser } from './token-validate.actions';

const store = createStore(appReducer, defaultState(), applyMiddleware(thunk));
store.dispatch(loadUser() as any);

const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Main></Main>
      </Provider>
    </div>
  );
}

export default App;