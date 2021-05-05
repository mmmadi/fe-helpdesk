import { useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrder,
  takeInWork,
  doneOrder,
  cancelOrder,
  getOrderParty,
} from "../../redux/actions/orderActions";
import { hideFullAlert } from "../../redux/actions/actions";
import { ActionBtns } from "../../components/order/ActionBtns";
import { OrderBody } from "../../components/order/OrderBody";
import { OrderHead } from "../../components/order/OrderHead";
import { LockAlertChange } from "../../components/order/LockAlertChange";
import { OrderComment } from "../../components/order/OrderComment";
import { OrderCreator } from "../../components/order/OrderCreator";
import { OrderParty } from "../../components/order/OrderParty";
import { OrderShimmer } from "../../components/shimmers/OrderShimmer";

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
  const orderPartyData = useSelector((state) => state.order.orderParty);

  useEffect(() => {
    dispatch(getOrder(orderId));
    dispatch(getOrderParty(orderId));
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

  const getCreate = (param) => {
    if (order.type !== "danger") {
      if (param === 1) {
        if (order.data[0].creator) {
          return order.data[0].creator;
        } else if (order.data[0].client) {
          return null;
        } else {
          return order.data[0].id_user_ins;
        }
      }
      if (param === 2) {
        if (order.data[0].creator) {
          if (order.data[0].creator_img) {
            return order.data[0].creator_img;
          } else {
            return null;
          }
        } else if (order.data[0].client) {
          return null;
        } else {
          return order.data[0].image;
        }
      }
      if (param === 3) {
        if (order.data[0].creator_fio) {
          return order.data[0].creator_fio;
        } else if (order.data[0].client) {
          return order.data[0].client;
        } else {
          return order.data[0].author;
        }
      }
      if (param === 4) {
        if (order.data[0].creator_struct) {
          return order.data[0].creator_struct;
        } else if (order.data[0].client) {
          return null;
        } else {
          return order.data[0].author_struct;
        }
      }
    }
  };

  if (!order) {
    return <OrderShimmer />;
  }

  if (order.type === "danger") {
    return (
      <div className="layout-container">
        <Navbar />
        <div className="layout-content">
          <div className="order-list-section container-fluid flex-grow-1 container-p-y">
            <h4 className="font-weight-bold mb-4">{order.message}</h4>
          </div>
        </div>
      </div>
    );
  }

  if (order.type === "warning") {
    return (
      <div className="layout-container">
        <Navbar />
        <div className="layout-content">
          <div className="order-list-section container-fluid flex-grow-1 container-p-y">
            <h4 className="font-weight-bold mb-4">{order.message}</h4>
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
            order={order.data}
            userData={userData}
            cancelData={cancelData}
            doneData={doneData}
          />
          <div className="row order-section">
            <div className="col-sm-8">
              <OrderBody
                order={order.data}
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
                order={order.data}
                cancelData={cancelData}
              />
              {have_task && (
                <ActionBtns
                  takeToWork={takeToWork}
                  doneWorkHandler={doneWorkHandler}
                  cancelOrderHandlder={cancelOrderHandlder}
                  userData={userData}
                  order={order.data}
                  cancelData={cancelData}
                  doneData={doneData}
                />
              )}
              <OrderComment />
            </div>
            <div className="col-sm-4">
              <OrderCreator
                id={getCreate(1)}
                img={getCreate(2)}
                fio={getCreate(3)}
                struct={getCreate(4)}
              />
              <OrderParty
                orderPartyData={orderPartyData}
                orderId={orderId}
                have_task={have_task}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
