import { Switch, Route, Redirect } from "react-router-dom";
import { Dashboard } from "./screens/Dashboard/Dashboard";
import { CreateOrder } from "./screens/Orders/CreateOrder";
import { Order } from "./screens/Orders/Order";
import { Orders } from "./screens/Orders/Orders";
import { UpdateOrder } from "./screens/Orders/UpdateOrder";
import { Help } from "./screens/Help/Help";
import { Login } from "./screens/Login";
import { UserProfile } from "./screens/Profile/UserProfile";

export const useRoutes = (isLogin, isLogin1) => {
  if (!isLogin) {
    return (
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Redirect to="/login" />
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/create-order">
          <CreateOrder />
        </Route>
        <Route path="/orders" exact>
          <Orders />
        </Route>
        <Route path="/orders/:id">
          <Order />
        </Route>
        <Route path="/order/update/:id">
          <UpdateOrder />
        </Route>
        <Route path="/help">
          <Help />
        </Route>
        <Route path="/profile">
          <UserProfile />
        </Route>
        <Redirect to="/dashboard" />
      </Switch>
    );
  }
};
