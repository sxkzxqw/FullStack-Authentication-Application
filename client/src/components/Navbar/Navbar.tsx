import React, { useContext } from 'react';
import styles from './Navbar.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { Paths } from '../../app/router/router';
import { Context } from '../../app/main';

const Navbar = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      navigate(Paths.LOGIN)
      store.logout();
    } catch (error) {
      alert("Error (look network)")
    }
  }

  const renderAuthActions = (): React.ReactNode => {
    return (
      <>
        <NavLink className={({ isActive }) => isActive ? styles.activeLink : ''} to={Paths.ACCOUNT}>Account</NavLink>
        <NavLink className={({ isActive }) => isActive ? styles.activeLink : ''} to={Paths.USERS}>Users</NavLink>
        <button onClick={handleLogout}>Logout</button>
      </>
    )
  }

  const renderNonAuthActions = (): React.ReactNode => {
    return (
      <>
        <NavLink className={({ isActive }) => isActive ? styles.activeLink : ''} to={Paths.LOGIN}>login</NavLink>
        <NavLink className={({ isActive }) => isActive ? styles.activeLink : ''} to={Paths.REGISTER}>register</NavLink>
      </>
    )
  }

  return (
    <div className={styles.content}>
      <div className={styles.logo}>
        <p>FullStack</p>
        <strong>Authorization</strong>
      </div>
      <nav className={styles.navbar}>
        {!store.isAuth && renderNonAuthActions()}
        {store.isAuth && renderAuthActions()}
      </nav>
    </div>
  );
};

export default Navbar;