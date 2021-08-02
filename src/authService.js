import createAuth0Client from '@auth0/auth0-spa-js';
import { user, isAuthenticated, popupOpen } from './store';
import config from '../auth0_config';
import axios from 'axios';

let storeUser;

user.subscribe((value) => {
  storeUser = value;
});

const recipesApi = axios.create({
  baseURL: 'https://mycookeroo.herokuapp.com/api/users',
});

const postUser = async (body) => {
  await recipesApi.post(`/`, body);
};

async function createClient() {
  let auth0Client = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
  });

  return auth0Client;
}

async function loginWithPopup(client, options) {
  popupOpen.set(true);
  try {
    await client.loginWithPopup(options);

    user.set(await client.getUser());
    isAuthenticated.set(true);
  } catch (e) {
    console.error(e);
  } finally {
    popupOpen.set(false);
    postUser({
      username: storeUser.nickname,
      name: storeUser.nickname,
      email: storeUser.email,
      avatar_url: 'https://bit.ly/3rD32gb',
      recipes: [],
      created_at: storeUser.updated_at,
    });
  }
}

function logout(client) {
  return client.logout();
}

const auth = {
  createClient,
  loginWithPopup,
  logout,
};

export default auth;
