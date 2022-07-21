import React, {useContext} from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Login from "./Login";
import "./index.css";
import { AuthContextProvider, AuthContext } from './hooks/auth';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function Top() {
  const { isLogin, authIsReady } = useContext(AuthContext);
  return (
    <div>
      {authIsReady && (
        <Router>
          <Routes>
            <Route
              path="/"
              element={isLogin ? <App /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!isLogin ? <Login /> : <Navigate to="/" />}
            />
          </Routes>
        </Router>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <Top />
    </AuthContextProvider>
  </React.StrictMode>
);
