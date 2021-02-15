import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRoutes } from "./routes";
import { checkAuth } from "./redux/actions";
import { useEffect } from "react";
import { Sidenav } from "./components/Sidenav";
import { Login } from "./screens/Login";

function App() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);

  const isLogin = data.token ? true : false;

  const routes = useRoutes(isLogin);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (!isLogin) {
    return <Login />;
  }

  return (
    <Router>
      <div className="layout-wrapper">
        <div className="layout-inner">
          <Sidenav />
          {routes}
        </div>
      </div>
    </Router>
  );
}

export default App;
