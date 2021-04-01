import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "../components/Alert";
import { Loader } from "../components/Loader";
import { login } from "../redux/actions/actions";

export const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  // const data = useSelector((state) => state.data.data);
  const loading = useSelector((state) => state.app.loading);
  const alert = useSelector((state) => state.app.alert);

  const loginHandler = (event) => {
    event.preventDefault();

    dispatch(login(form));
  };

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <div className="login-form">
      <form onSubmit={loginHandler}>
        <h3>Login</h3>
        {alert ? (
          <Alert message={alert} type={"warning"} section={false} />
        ) : null}
        <div className="mb-3">
          <label htmlFor="email-input" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email-input"
            aria-describedby="emailHelp"
            value={form.email}
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
