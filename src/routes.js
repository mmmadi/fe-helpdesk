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
  function PRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isLogin ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }

  return (
    <Switch>
      {!isLogin && <Route path="/login" component={Login} />}
      <PRoute path="/dashboard">
        <Dashboard />
      </PRoute>
      <PRoute path="/create-order">
        <CreateOrder />
      </PRoute>
      <PRoute path="/orders" exact>
        <Orders />
      </PRoute>
      <PRoute path="/orders/:id">
        <Order />
      </PRoute>
      <PRoute path="/order/update/:id">
        <UpdateOrder />
      </PRoute>
      <PRoute path="/help" exact>
        <Help />
      </PRoute>
      <PRoute path="/help-item/:id">
        <HelpItem />
      </PRoute>
      <PRoute path="/help/edit/item/:id">
        <UpdateHelpItem />
      </PRoute>
      <PRoute path="/help/cat/:id">
        <HelpCategory />
      </PRoute>
      <PRoute path="/help/edit/category" exact>
        <HelpCategories />
      </PRoute>
      <PRoute path="/help/edit/category/:id">
        <UpdateHelpCategory />
      </PRoute>
      <PRoute path="/help/add/category">
        <CreateHelpCategory />
      </PRoute>
      <PRoute path="/help/add/item">
        <CreateHelpItem />
      </PRoute>
      <PRoute path="/profile">
        <UserProfile />
      </PRoute>
      {!isLogin ? <Redirect to="/login" /> : <Redirect to="/dashboard" />}
    </Switch>
  );
};
