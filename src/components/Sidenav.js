import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../images/favicon.ico";
import { elementList } from "../components/const/SidenavEl";
import { Badge } from "../components/Badge";
import { getCount } from "../redux/actions/orderActions";

export const Sidenav = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const dispatch = useDispatch();
  const count = useSelector((state) => state.order.count);
  const userId = useSelector((state) => state.auth.data.userId);

  useEffect(() => {
    dispatch(getCount(userId));
  }, [dispatch, userId]);

  const activeHandle = (index) => {
    const html = document.querySelector("html");
    const overlay = document.querySelector(".layout-overlay");

    html.classList.remove("layout-expanded");
    if (overlay.style.display === "block") overlay.style.display = "none";
    setActiveIndex(index);
  };

  return (
    <div className="layout-sidenav sidenav-vertical">
      <div className="app-brand">
        <span>
          <img src={Logo} alt="logo" width={40} />
          <span className="logo_title">
            <Link to="/">PETROLEUM</Link>
          </span>
        </span>
      </div>
      <div className="sidenav-divider"></div>
      <ul className="sidenav-content py-1 ps">
        {elementList.map((el) => {
          return (
            <li
              className={`sidenav-item${
                activeIndex === el.id ? " active" : ""
              }`}
              key={el.id}
            >
              <Link
                to={el.route}
                className="sidenav-link"
                onClick={() => activeHandle(el.id)}
              >
                <span>
                  <FontAwesomeIcon icon={el.icon} />
                  <span className="sidetitle">{el.text}</span>
                </span>
                <span className="side_badge">
                  {el.badge ? <Badge count={count} /> : null}
                </span>
              </Link>
            </li>
          );
        })}

        <li className="sidenav-divider"></li>
      </ul>
    </div>
  );
};
