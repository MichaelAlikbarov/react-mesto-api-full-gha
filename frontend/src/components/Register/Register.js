import { Link } from "react-router-dom";
import { useForm } from "../../utils/hooks/useForm";

export default function Register({ handleRegister }) {

  const {values, handleChange} = useForm({});

  const handleSubmit = (e) => {
    const { email, password } = values;
    e.preventDefault();
    handleRegister(email, password);
  };

  return (
    <div className="form-container">
      <p className="form-container__title">Регистрация</p>
      <form className="form-container__form" onSubmit={handleSubmit}>
        <input
          className="form-container__input"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required
          value={values.email}
          onChange={handleChange}
        />
        <input
          className="form-container__input"
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          required
          value={values.password}
          onChange={handleChange}
        />
        <button className="form-container__button">
          <p className="form-container__button-title">Зарегистрироваться</p>
        </button>
      </form>
      <div className="form-container__signature">
        <p className="form-container__signature-title">Уже зарегистрированы?</p>
        <Link to="/signin" className="form-container__login-link">
          <p className="form-container__signature-subtitle">Войти</p>
        </Link>
      </div>
    </div>
  );
}
