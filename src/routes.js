import { Switch, Route, Redirect } from "react-router-dom";
import { Dashboard } from "./screens/Dashboard/Dashboard";
import { CreateOrder } from "./screens/Orders/CreateOrder";
import { Order } from "./screens/Orders/Order";
import { Orders } from "./screens/Orders/Orders";
import { UpdateOrder } from "./screens/Orders/UpdateOrder";
import { Help } from "./screens/Help/Help";
import { Login } from "./screens/Login";
import { UserProfile } from "./screens/Profile/UserProfile";
import { HelpCategories } from "./screens/Help/HelpCategories";
import { CreateHelpCategory } from "./screens/Help/CreateHelpCategory";
import { UpdateHelpCategory } from "./screens/Help/UpdateHelpCategory";
import { HelpCategory } from "./screens/Help/HelpCategory";
import { HelpItem } from "./screens/Help/HelpItem";
import { CreateHelpItem } from "./screens/Help/CreateHelpItem";
import { UpdateHelpItem } from "./screens/Help/UpdateHelpItem";

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
        <Route path="/help" exact>
          <Help />
        </Route>
        <Route path="/help-item/:id">
          <HelpItem />
        </Route>
        <Route path="/help/edit/item/:id">
          <UpdateHelpItem />
        </Route>
        <Route path="/help/cat/:id">
          <HelpCategory />
        </Route>
        <Route path="/help/edit/category" exact>
          <HelpCategories />
        </Route>
        <Route path="/help/edit/category/:id">
          <UpdateHelpCategory />
        </Route>
        <Route path="/help/add/category">
          <CreateHelpCategory />
        </Route>
        <Route path="/help/add/item">
          <CreateHelpItem />
        </Route>
        <Route path="/profile">
          <UserProfile />
        </Route>
        <Redirect to="/dashboard" />
      </Switch>
    );
  }
};
