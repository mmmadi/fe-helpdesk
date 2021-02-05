import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions";

export const Navbar = () => {
  const dispatch = useDispatch();

  const fio = useSelector((state) => state.data.data.fio);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          HelpDesk
        </a>
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
              className="btn btn-secondary dropdown-toggle dropdown-nav-button"
              type="button"
              id="dropdownMenu2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {fio}
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
                  onClick={() => dispatch(logout())}
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
