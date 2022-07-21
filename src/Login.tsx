import "./App.css";
import React, { useContext, useState, useEffect } from 'react'
import { useLogin } from "./hooks/useLogin";
import { AuthContext } from "./hooks/auth";


function Login() {
  const [login, error, isPending] = useLogin();
  const { isLogin, setIsLogin } = useContext(AuthContext);

  async function loginHandler(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    if (!email || !password) return;
    const info = await login(email, password);
    if (info) setIsLogin(true);
    console.log(isLogin);
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