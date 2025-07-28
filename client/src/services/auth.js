import { data } from "react-router-dom";
import Client from "./api";

export const SignInUser = async (data) => {
  try {
    const res = await Client.post("auth/sign-in/", data);
    localStorage.setItem("token", res.data.access);
    let newData = { ...res.data, username: data.username, email: data.email };

    if (newData.access.length > 200) {
      return res.data;
    } else {
      throw error;
    }
  } catch (error) {
    console.log(`error in signin the user: ${error.message}`);
    throw error;
  }
};

export const RegisterUser = async (data) => {
  try {
    console.log(data);
    const res = await Client.post("auth/sign-up/", data);
    return res;
  } catch (error) {
    console.log(`error in sign up user:${error.message}`);
    throw error;
  }
};
