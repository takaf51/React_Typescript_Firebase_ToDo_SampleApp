import "./App.css";
import React from 'react'

function Login() {
  function loginHandler(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  return (
    <section className="login">
      <div className="box">
        <h3>Login</h3>
        <form onSubmit={loginHandler}>
          <div className="input">
            <label> Email</label>
            <input type="email"></input>
          </div>
          <div className="input">
            <label> Password</label>
            <input type="password"></input>
          </div>
          <button>Login</button>
        </form>
      </div>
    </section>
  );
}

export default Login;