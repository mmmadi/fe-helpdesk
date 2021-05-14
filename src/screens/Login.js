import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { Alert } from "../components/Alert";
import { Loader } from "../components/Loader";
import { login } from "../redux/actions/actions";

export const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  // const data = useSelector((state) => state.data.data);
  const loading = useSelector((state) => state.app.loading);
  const alert = useSelector((state) => state.app.alert);

  const loginHandler = (event) => {
    event.preventDefault();
    dispatch(login(form)).then(() => {
      history.replace(from);
    });
  };

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <div className="login-form">
      <form onSubmit={loginHandler}>
        <h3>Вход</h3>
        {alert ? (
          <Alert message={alert} type={"warning"} section={false} />
        ) : null}
        <div className="mb-3">
          <label htmlFor="username-input" className="form-label">
            Имя пользователя
          </label>
          <input
            type="text"
            name="username"
            className="form-control"
            id="username-input"
            value={form.username}
            onChange={changeHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pass-input" className="form-label">
            Пароль
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="pass-input"
            value={form.password}
            onChange={changeHandler}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading && true}
        >
          {loading ? <Loader /> : "Войти"}
        </button>
      </form>
    </div>
  );
};
