import { useForm } from "../../utils/hooks/useForm";

function Login({ handleLogin }) {

  const {values, handleChange} = useForm({});

  const handleSubmit = (e) => {
    const { email, password } = values;
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <div className="form-container">
      <p className="form-container__title">Вход</p>
      <form className="form-container__form" onSubmit={handleSubmit}>
        <input
          className="form-container__input"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required
          value={values?.email || ''}
          onChange={handleChange}
        />
        <input
          className="form-container__input"
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          required
          value={values?.password || ''}
          onChange={handleChange}
        />
        <button className="form-container__button">
          <p className="form-container__button-title">Войти</p>
        </button>
      </form>
    </div>
  );
}

export default Login;
