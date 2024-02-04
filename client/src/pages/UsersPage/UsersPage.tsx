import { useEffect, useState } from 'react';
import UserService from '../../services/UserService';
import { IUser } from '../../models/IUser';
import Loader from '../../components/Loader/Loader';
import styles from './UsersPage.module.scss';

const UsersPage = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isUsersLoading, setIsUsersLoading] = useState(false)

  const handleGetUsers = async () => {
    try {
      setIsUsersLoading(true);
      const res = await UserService.fetchUsers();

      setUsers(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUsersLoading(false);
    }
  }

  useEffect(() => {
    handleGetUsers();
  }, [])

  if (isUsersLoading) {
    return (
      <Loader />
    )
  }

  return (
    <div className={styles.content}>
      <h2>Users List:</h2>
      <ul>
        {users.map((user) => {
          return <li key={user.email}>{user.email}</li>
        })}
      </ul>
    </div>
  );
};

export default UsersPage;