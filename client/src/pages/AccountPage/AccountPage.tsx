import React, { useContext } from 'react';
import { Context } from '../../app/main';

const AccountPage = () => {
  const { store } = useContext(Context);

  return (
    <div className="container">
      <h1 className="title">{`Authorized by email: ${store.user.email}`}</h1>
      {store.user.isActivated
        ? <h2>Account has been activated by email</h2>
        : <button onClick={() => store.mail()}>Send confirmation mail again (Your account not activated)</button>
      }
    </div>
  )
};

export default AccountPage;