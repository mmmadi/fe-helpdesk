import { useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrder,
  takeInWork,
  doneOrder,
  cancelOrder,
} from "../../redux/actions/orderActions";
import { hideFullAlert } from "../../redux/actions/actions";
import { ActionBtns } from "../../components/order/ActionBtns";
import { OrderBody } from "../../components/order/OrderBody";
import { OrderHead } from "../../components/order/OrderHead";
import { LockAlertChange } from "../../components/order/LockAlertChange";
import { OrderComment } from "../../components/order/OrderComment";

export const Order = () => {
  const dispatch = useDispatch();
  const orderId = useParams().id;
  const order = useSelector((state) => state.order.order);
  const { have_task, userId } = useSelector((state) => state.auth.data);
  const alert = useSelector((state) => state.app.fullAlert);
  const userData = useSelector((state) => state.order.inWork);
  const cancelData = useSelector((state) => state.order.cancel);
  const doneData = useSelector((state) => state.order.done);
  const deleteData = useSelector((state) => state.order.delete);

  useEffect(() => {
    dispatch(getOrder(orderId));
  }, [dispatch, orderId]);

  const cancelOrderHandlder = (param) => {
    dispatch(cancelOrder(orderId, userId, param));
  };

  const takeToWork = (param) => {
    dispatch(takeInWork(orderId, userId, param));
  };

  const doneWorkHandler = (param) => {
    dispatch(doneOrder(orderId, userId, param));
  };

  const closeAlert = () => {
    dispatch(hideFullAlert());
  };

  if (!order) {
    return (
      <div className="layout-container">
        <Navbar />
        <div className="layout-content">
          <div className="order-list-section container-fluid flex-grow-1 container-p-y">
            <h4 className="font-weight-bold mb-4">Заявка не найдена</h4>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="layout-container">
      <Navbar />
      <div className="layout-content">
        <div className="order-list-section container-fluid flex-grow-1 container-p-y">
          <OrderHead
            order={order}
            userData={userData}
            cancelData={cancelData}
            doneData={doneData}
          />
          <div className="row order-section">
            <div className="col-sm-8">
              <OrderBody
                order={order}
                closeAlert={closeAlert}
                alert={alert}
                userData={userData}
                cancelData={cancelData}
                doneData={doneData}
                deleteData={deleteData}
              />
              <LockAlertChange
                doneData={doneData}
                userData={userData}
                order={order}
                cancelData={cancelData}
              />
              {have_task && (
                <ActionBtns
                  takeToWork={takeToWork}
                  doneWorkHandler={doneWorkHandler}
                  cancelOrderHandlder={cancelOrderHandlder}
                  userData={userData}
                  order={order}
                  cancelData={cancelData}
                  doneData={doneData}
                />
              )}
            </div>
            <div className="col-sm-4">
              <OrderComment />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
