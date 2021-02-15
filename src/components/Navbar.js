import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../redux/actions";
import DefUser from "../images/def-user.png";

export const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const fio = useSelector((state) => state.data.data.fio);

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <nav
      className="layout-navbar navbar navbar-expand-lg navbar-light bg-light"
      style={{ boxShadow: "0 10px 30px 0 rgb(24 28 33 / 6%)" }}
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle dropdown-nav-button text-dark"
              type="button"
              id="dropdownMenu2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span>
                <span className="px-1 mr-lg-2 ml-2 ml-lg-0">{fio}</span>
                <img
                  src={DefUser}
                  alt="default user icon"
                  className="ui-w-30 rounded-circle"
                />
              </span>
            </button>
            <ul
              className="dropdown-menu dropdown-menu-navbar"
              aria-labelledby="dropdownMenu2"
            >
              <li>
                <button className="dropdown-item" type="button">
                  Action
                </button>
              </li>
              <li>
                <button className="dropdown-item" type="button">
                  Another action
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={logoutHandler}
                >
                  Выйти
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
