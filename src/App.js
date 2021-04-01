import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRoutes } from "./routes";
import { checkAuth } from "./redux/actions/actions";
import { Sidenav } from "./components/Sidenav";
import { Login } from "./screens/Login";

function App() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.auth);

  const isLogin = data.token ? true : false;

  const routes = useRoutes();

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
