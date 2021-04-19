import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRoutes } from "./routes";
import { checkAuth } from "./redux/actions/actions";
import { Sidenav } from "./components/Sidenav";
import { FullscreenLoader } from "./components/FullscreenLoader";

function App() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [isLogin1, setIsLogin1] = useState(false);

  const isLogin = data.token ? true : false;

  useEffect(() => {
    dispatch(checkAuth())
      .then((data) => {
        setIsLogin1(true);
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  const routes = useRoutes(isLogin, isLogin1);

  if (loading) {
    return <FullscreenLoader />;
  }

  return (
    <Router>
      <div className="layout-wrapper">
        <div className="layout-inner">
          {isLogin ? (
            <>
              <Sidenav />
              {routes}
            </>
          ) : (
            routes
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
