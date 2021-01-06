import Socket from "../util/Socket";
import { idmEPs } from "../Config.json";

const { loginEP, registerEP } = idmEPs;

async function login(name, password) {
  const payLoad = {
    uname: name,
    upw: password
  };

  return await Socket.POST(loginEP, payLoad);
}

async function register(email, password) {
  const payLoad = {
    email: email,
    password: password.split("")
  };

  return await Socket.POST(registerEP, payLoad);
}

export default {
  login, register
};
