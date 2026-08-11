import { useState } from "react";
import style from "./styles.module.css";
import { useAuthStore } from "../../store/authStore";
import logoIN from "../../assets/logoIN.png";
import lupa from "../../assets/lupa.png";
import user from "../../assets/user.png";
import favorites from "../../assets/favoritos.png";
import wacthed from "../../assets/assistidos.png";
import rating from "../../assets/avaliacao.png";
import exit from "../../assets/sair.png";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [pesquisa, setPesquisa] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  function handleLogout() {
    logout();
    setMenuOpen(false);
    navigate("/");
  }
  function handleSearchSubmit(e: React.FormEvent) {
  e.preventDefault();
  navigate(`/search?q=${encodeURIComponent(pesquisa)}`);
}

  function handleClick() {
    setMenuOpen(!menuOpen);
  }

  return (
    <>
      <header className={style.header}>
        <Link to="/">
          <img src={logoIN} alt="logoFoda" className={style.logoIN} />
        </Link>
        <div className={style.right}>
          <form onSubmit={handleSearchSubmit} className={style.input}>
            <input
              className={style.pesquisa}
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
            />
            <button type="submit" className={style.searchButton}>
              <img src={lupa} alt="lupa" />
            </button>
          </form>
          {token && (
            <div className={style.userContainer}>
              <img
                className={style.user}
                src={user}
                alt="perfil"
                onClick={handleClick}
              />
              {menuOpen && (
                <div className={style.menu}>
                  <ul>
                    <li>
                      <Link to="/favoritos" onClick={() => setMenuOpen(false)}>
                        <img
                          className={style.icon}
                          src={favorites}
                          alt="Favoritos"
                        />
                        Favoritos
                      </Link>
                    </li>
                    <li>
                      <Link to="/assistidos" onClick={() => setMenuOpen(false)}>
                        <img
                          className={style.icon}
                          src={wacthed}
                          alt="Assistidos"
                        />
                        Assistidos
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/minhas-avaliacoes"
                        onClick={() => setMenuOpen(false)}
                      >
                        <img
                          className={style.icon}
                          src={rating}
                          alt="Avaliações"
                        />
                        Avaliações
                      </Link>
                    </li>
                    <li style={{ color: "#F40D0D" }}>
                      <button
                        className={style.logoutButton}
                        onClick={handleLogout}
                      >
                        <img className={style.icon} src={exit} alt="Sair" />
                        Sair
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </header>
    </>
  );
}
