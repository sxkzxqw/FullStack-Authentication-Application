import React, { FC, useContext, useEffect } from 'react';
import styles from './MainLayout.module.scss';
import Navbar from '../../components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { Context } from '../../app/main';
import { observer } from 'mobx-react-lite';
import Loader from '../../components/Loader/Loader';

const MainLayout: FC = () => {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, [])

  if (store.isAppLoading) {
    return <Loader />
  }

  return (
    <>
      <header className={styles.header}>
        <Navbar />
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
};

export default observer(MainLayout);