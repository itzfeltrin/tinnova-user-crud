import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import {UserContextProvider} from './context/User.context';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserContextProvider>
      <App/>
    </UserContextProvider>
  </React.StrictMode>
);
