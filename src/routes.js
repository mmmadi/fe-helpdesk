import { Switch, Route, Redirect } from "react-router-dom";
import { Dashboard } from "./screens/Dashboard/Dashboard";
import { CreateOrder } from "./screens/Orders/CreateOrder";
import { Order } from "./screens/Orders/Order";
import { Orders } from "./screens/Orders/Orders";
import { UpdateOrder } from "./screens/Orders/UpdateOrder";
import { Help } from "./screens/Help/Help";

export const useRoutes = () => {
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
      <Redirect to="/dashboard" />
    </Switch>
  );
};
