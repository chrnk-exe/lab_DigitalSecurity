import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import AppRoutes from './components/AppRoutes';
import { Provider } from 'react-redux'
import { store } from './data/store';
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter window={window}>
      <AppRoutes />
    </BrowserRouter>
  </Provider>
  /* </React.StrictMode> */
);