import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSignOutAlt, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../redux/actions/actions";
import DefUser from "../images/def-user.png";
import { server } from "../config/config.json";

export const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { fio, userImg, userId } = useSelector((state) => state.auth.data);

  const sidenavToggler = () => {
    const html = document.querySelector("html");
    const overlay = document.querySelector(".layout-overlay");
    html.classList.toggle("layout-expanded");

    if (overlay.style.display === "none") {
      overlay.style.display = "block";
    } else {
      overlay.style.display = "none";
    }
  };

  const zoomSideBar = () => {
    const html = document.querySelector("html");
    html.classList.toggle("layout-collapsed");
  };

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
          className="sidebar_menu toggle_menu"
          type="button"
          onClick={zoomSideBar}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <button
          className="sidebar_menu navbar-toggler"
          type="button"
          onClick={sidenavToggler}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
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
                {userImg ? (
                  <img
                    src={`${server}/static/users/${userId}/${userImg}`}
                    alt="default user icon"
                    className="ui-w-30 rounded-circle"
                  />
                ) : (
                  <img
                    src={DefUser}
                    alt="default user icon"
                    className="ui-w-30 rounded-circle"
                  />
                )}
              </span>
            </button>
            <ul
              className="dropdown-menu dropdown-menu-navbar"
              aria-labelledby="dropdownMenu2"
            >
              <li>
                <Link to="/profile" className="dropdown-item">
                  <FontAwesomeIcon
                    icon={faCog}
                    className="icon text-lightest"
                  />
                  Настройки
                </Link>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={logoutHandler}
                >
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    className="icon text-danger"
                  />
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
