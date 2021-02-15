import { Switch, Route, Redirect } from "react-router-dom";
import { One } from "./screens/One/One";
import { CreateOrder } from "./screens/Orders/CreateOrder";
import { Three } from "./screens/Three/Three";

export const useRoutes = (isLogin) => {
  return (
    <Switch>
      <Route path="/one">
        <One />
      </Route>
      <Route path="/create-order">
        <CreateOrder />
      </Route>
      <Route path="/three">
        <Three />
      </Route>
      <Redirect to="/one" />
    </Switch>
  );
};
