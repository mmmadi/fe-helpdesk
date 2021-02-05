import { Switch, Route, Redirect } from "react-router-dom";
import { Home } from "./screens/Home";
import { Login } from "./screens/Login";

export const useRoutes = (isLogin) => {
  if (!isLogin) {
    return (
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Redirect to="/login" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/home" exact>
        <Home />
      </Route>
      <Redirect to="home" />
    </Switch>
  );
};
