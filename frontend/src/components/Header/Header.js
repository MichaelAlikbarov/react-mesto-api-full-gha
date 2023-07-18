import { useLocation, Link } from "react-router-dom";

function Header({ handleSignOut, userProfile }) {
  const location = useLocation();
  return (
    <header className="header">
      <div className="logo" />
      {location.pathname === "/" && (
        <div className="header__my-profile">
          <p className="header__my-email">{userProfile}</p>
          <Link to="/signin" className="form-container__login-link">
            <button
              className="header__button header__button_logout"
              onClick={handleSignOut}
            >
              Выйти
            </button>
          </Link>
        </div>
      )}
      {location.pathname === "/signin" && (
        <div className="header__my-profile">
          <Link to="/signup" className="form-container__login-link">
            <button className="header__button">Регистрация</button>
          </Link>
        </div>
      )}
      {location.pathname === "/signup" && (
        <div className="header__my-profile">
          <Link to="/signin" className="form-container__login-link">
            <button className="header__button">Войти</button>
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
