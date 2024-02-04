import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../http";
import UserService from "../services/UserService";

export default class Store {
  user = {} as IUser;
  isAuth = false;
  isAppLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setAppLoading(bool: boolean) {
    this.isAppLoading = bool;
  }

  async login(email: string, password: string) {
    try {
      const res = await AuthService.login(email, password);
      localStorage.setItem('token', res.data.accessToken);
      this.setAuth(true);
      this.setUser(res.data.user);
    } catch (error: any) {
      alert(error.res?.data.message);
    }
  }

  async register(email: string, password: string) {
    try {
      console.log('1');

      const res = await AuthService.registration(email, password);
      localStorage.setItem('token', res.data.accessToken);
      this.setAuth(true);
      this.setUser(res.data.user);
    } catch (error: any) {
      alert(error.res?.data.message);
    }
  }

  async logout() {
    try {
      this.setAuth(false);
      this.setUser({} as IUser);
      localStorage.removeItem('token');
      const res = await AuthService.logout();
    } catch (error: any) {
      alert(error.res?.data?.message);
    }
  }

  async mail() {
    try {
      const res = await UserService.sendMailAgain();
    } catch (error: any) {
      alert(error.res?.data.message);
    }
  }

  async checkAuth() {
    try {
      this.setAppLoading(true);
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });

      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error: any) {
      alert(error.res?.data?.message);
    } finally {
      this.setAppLoading(false);
    }
  }
}