// src/pages/Login.tsx
import { useState } from "react";
import { login } from "../../services/authService";
import { useAuthStore } from "../../store/authStore";
import { Link, useNavigate } from "react-router";
import styles from "./styles.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setToken = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login(email, password)
      .then((response) => {
        console.log("Login bem-sucedido:", response.data);
        setToken(response.data.token);
        navigate("/");
      })
      .catch((error) => {
        console.error("Erro no login:", error);
      });
  }

  return (
    <>
      <div className={styles.authPage}>
        <h1 className={styles.logo}>Film{"{IN}"}hos</h1>
        <div className={styles.authContainer}>
          <h1 className={styles.loginTitle}>Login</h1>
          <div className={styles.loginLink}>
            <h3>Não possui uma conta? </h3>
            <Link to="/cadastro">Cadastre-se</Link>
          </div>
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.inputContainer}>
              <label htmlFor="email">Email</label>
              <input
                className={styles.authInput}
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="xxxx@gmail.com"
              />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="password">Senha</label>
              <input
                className={styles.authInput}
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <img src="src/assets/ocultar.png" alt="ocultar" />
            </div>
            <div className={styles.loginOptions}>
              <div className={styles.loginCheckbox}>
                <input type="checkbox" />
                <span>Mantenha-me conectado</span>
              </div>
              <a href="#">Esqueceu a senha?</a>
            </div>

            <button className={styles.formButton} type="submit">
              Log In
            </button>
          </form>
        </div>
      </div>{" "}
    </>
  );
}
