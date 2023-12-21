/* eslint-disable no-useless-catch */
import config from '../config/config';
import { Client, Account, ID } from 'appwrite';

export class AuthServices {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    try {
      // userAccount is created
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another method for login
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }
  async login(email, password) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log('appwrite:: Service::getUser', error);
    }
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log('appwrite:: Service::logout', error);
    }
  }
}

const authServices = new AuthServices();

export default authServices;
