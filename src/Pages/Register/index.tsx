import { Link, useNavigate } from "react-router-dom";
import styles from "../Login/styles.module.css";
import { useState } from "react";
import { signup } from "../../services/authService";
import { z } from "zod";
import { useAuthStore } from "../../store/authStore";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [cell, setCell] = useState("");
  const [password, setPassword] = useState("");
  const setToken = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const passwordSchema = z
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .max(32, "A senha deve ter no mínimo 8 caracteres");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassoword, setShowPassowrd] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = passwordSchema.safeParse(password);
    if (!result.success) {
      setErrorMessage(result.error.issues[0].message);
      return;
    }
    signup(fullName, email, password, password).then((response) => {
      console.log("Conta criada com sucesso", response.data);
      setToken(response.data.data.token);
      navigate("/");
    }).catch((error) => {
      const apiMessage = error.response?.data?.errors?.[0]?.message;
      setErrorMessage(apiMessage ?? "Erro ao criar conta. Tente novamente.");
    });;
  }

  return (
    <>
      <div className={styles.authPage}>
        <h1 className={styles.logo}>Film{"{IN}"}hos</h1>
        <div className={styles.authRegister}>
          <h1 className={styles.authTitle}>Cadastro</h1>
          <div className={styles.registerLink}>
            <h3>Já possui uma conta?</h3>
            <Link to="/login">Login</Link>
          </div>
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.inputContainer}>
              <label>Nome completo</label>
              <input
                className={styles.authInput}
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Cauê Lopes"
              />
            </div>
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
              <label>Data de Nascimento</label>
              <input
                className={styles.authInput}
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Número de Telefone</label>
              <input
                className={styles.authInput}
                type="text"
                value={cell}
                onChange={(e) => setCell(e.target.value)}
                placeholder="(XX) 9XXXX-XXXX"
              />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="password">Senha</label>
              <input
                className={styles.authInput}
                id="password"
                type={showPassoword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              {errorMessage && (
                <p className={styles.errorText}>{errorMessage}</p>
              )}
              <img
                src="src/assets/ocultar.png"
                alt="ocultar"
                onClick={() => setShowPassowrd(!showPassoword)}
              />
            </div>
            <button className={styles.formButton} type="submit">
              Cadastre-se
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
