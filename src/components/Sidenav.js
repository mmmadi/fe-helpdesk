import { useEffect, useState } from "react";
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
    setActiveIndex(index);
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
        {elementList.map((el) => {
          return (
            <li
              className={`sidenav-item ${
                activeIndex === el.id ? "active" : ""
              }`}
              key={el.id}
            >
              <Link
                to={el.route}
                className="sidenav-link"
                onClick={() => activeHandle(el.id)}
              >
                {el.text}
                {el.badge ? <Badge count={count} /> : null}
              </Link>
            </li>
          );
        })}

        <li className="sidenav-divider"></li>
      </ul>
    </div>
  );
};
