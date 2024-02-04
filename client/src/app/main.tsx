import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import Store from '../store/store.ts';
import './styles/global.scss';
import { RouterProvider } from 'react-router-dom';
import router from './router/router.tsx';

interface IStore {
  store: Store,
}

const store = new Store();

export const Context = createContext<IStore>({
  store,
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Context.Provider value={{ store }}>
    <RouterProvider router={router} />
  </Context.Provider>,
)
