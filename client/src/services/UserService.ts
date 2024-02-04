import { AxiosResponse } from "axios";
import api from "../http";
import { IUser } from "../models/IUser";
import { MailResponse } from "../models/response/MailResponse";

export default class UserService {
  static async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return api.get<IUser[]>('/users');
  }

  static async sendMailAgain(): Promise<AxiosResponse<MailResponse>> {
    return api.get<MailResponse>('/mail');
  }
}