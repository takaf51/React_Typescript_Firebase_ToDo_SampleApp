import "./App.css";

function Login() {
  return (
    <section>
      <div className="box">
        <h3>Login</h3>
        <div className="login">
          <form>
            <label>
              email
              <input type="email"></input>
            </label>
            <label>
              password
              <input type="password"></input>
            </label>
            <button>Login</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;