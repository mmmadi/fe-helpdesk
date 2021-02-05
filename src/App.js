import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRoutes } from "./routes";
import { Navbar } from "./components/Navbar";
import { checkAuth } from "./redux/actions";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);

  const isLogin = data.token ? true : false;

  const routes = useRoutes(isLogin);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Router>
      {isLogin && <Navbar />} {routes}
    </Router>
  );
}

export default App;
