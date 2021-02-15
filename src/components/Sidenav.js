import { Link } from "react-router-dom";
import Logo from "../images/favicon.ico";

export const Sidenav = () => {
  const fakeClick = (event) => {
    event.preventDefault();
    return;
  };

  const orderToggle = () => {
    const orderMenu = document.querySelector(".sidenav-menu");
    const toggleButton = document.querySelector(".sidenav-toggle");
    toggleButton.classList.toggle("open");
    orderMenu.classList.toggle("open");
  };

  return (
    <div className="layout-sidenav">
      <div className="app-brand">
        <span>
          <img src={Logo} alt="logo" width={40} />
          <Link to="/">PETROLEUM</Link>
        </span>
      </div>
      <div className="sidenav-divider"></div>
      <ul className="sidenav-content">
        <li className="sidenav-item active">
          <Link to="/one" className="sidenav-link">
            One
          </Link>
        </li>
        <li className="sidenav-item">
          <button onClick={orderToggle} className="sidenav-link sidenav-toggle">
            Заявки
          </button>
          <ul className="sidenav-menu">
            <li className="sidenav-item">
              <Link to="/create-order" className="sidenav-link">
                Создать заявку
              </Link>
            </li>
            <li className="sidenav-item">
              <a href="#!" onClick={fakeClick} className="sidenav-link">
                Список заявок
              </a>
            </li>
            <li className="sidenav-item">
              <a href="#!" onClick={fakeClick} className="sidenav-link">
                Удалённые заявки
              </a>
            </li>
          </ul>
        </li>
        <li className="sidenav-item">
          <Link to="/three" className="sidenav-link">
            Three
          </Link>
        </li>
        <li className="sidenav-item">
          <a href="#!" className="sidenav-link">
            Four
          </a>
        </li>
        <li className="sidenav-item">
          <a href="#!" className="sidenav-link">
            Five
          </a>
        </li>
        <li className="sidenav-item">
          <a href="#!" className="sidenav-link">
            Six
          </a>
        </li>
        <li className="sidenav-divider"></li>
      </ul>
    </div>
  );
};
