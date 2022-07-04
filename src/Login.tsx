import "./App.css";
import React, { useState } from 'react'
import { useLogin } from "./hooks/useLogin";
import { auth } from './firebase';
import { FirebaseError } from "firebase/app";

function Login() {
  const [login, error, isPending] = useLogin();
  async function loginHandler(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    if (!email || !password) return;
    const info = await login(email, password);
    console.log(info?.user.displayName);
  }

  return (
    <section className="login">
      {isPending && <div style={{ color: "red" }}>now loading</div>}
      <div className="box">
        <h3>Login</h3>
        <form onSubmit={loginHandler}>
          <div className="input">
            <label> Email</label>
            <input type="email" id="email"></input>
          </div>
          <div className="input">
            <label> Password</label>
            <input type="password" id="password"></input>
          </div>
          <button>Login</button>
        </form>
      </div>
    </section>
  );
}

export default Login;