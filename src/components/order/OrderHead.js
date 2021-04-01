import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { deleteOrder } from "../../redux/actions/orderActions";
import { showFullAlert } from "../../redux/actions/actions";
import { AlertModal } from "../const/AlertModal";

export const OrderHead = ({ order, userData, cancelData, doneData }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userId } = useSelector((state) => state.auth.data);
  const updateMessage = {
    message: "Заявка заблокирована! Редактирование невозможно!",
    type: "danger",
  };
  const deleteMessage = {
    message: "Заявка заблокирована! Удаление невозможно!",
    type: "danger",
  };

  const deleteOrderHandler = () => {
    if (cancelData) {
      dispatch(showFullAlert(deleteMessage));
      closeModal();
    } else if (userData) {
      if (userData.isLock) {
        dispatch(showFullAlert(deleteMessage));
        closeModal();
      } else if (userData.status === "Ожидания действия") {
        dispatch(deleteOrder(order[0].id));
        history.push("/orders");
        closeModal();
      }
    } else if (doneData) {
      if (doneData.isDone) {
        dispatch(showFullAlert(deleteMessage));
        closeModal();
      }
    } else if (order[0].status !== "Ожидания действия") {
      dispatch(showFullAlert(deleteMessage));
      closeModal();
    } else {
      dispatch(deleteOrder(order[0].id));
      history.push("/orders");
      closeModal();
    }
  };

  const closeModal = () => {
    const constModal = document.getElementById("cancel-button");

    constModal.click();
  };

  const updateOrder = () => {
    if (cancelData) {
      dispatch(showFullAlert(updateMessage));
    } else if (userData) {
      if (userData.isLock) {
        dispatch(showFullAlert(updateMessage));
      } else if (userData.status === "Ожидания действия") {
        history.push(`/order/update/${order[0].id}`, order);
      }
    } else if (doneData) {
      if (doneData.isDone) {
        dispatch(showFullAlert(updateMessage));
      }
    } else if (order[0].status !== "Ожидания действия") {
      dispatch(showFullAlert(updateMessage));
    } else {
      history.push({
        pathname: `/order/update/${order[0].id}`,
        state: { updateData: order },
      });
    }
  };

  return (
    <h4 className="font-weight-bold mb-4">
      Заявка № {order[0].id}
      {userId === order[0].id_user_ins && (
        <>
          <button
            className="btn btn-outline-danger btn-xs"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#constModal"
            style={{ marginLeft: ".5rem" }}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
          <button
            className="btn btn-outline-success btn-xs"
            style={{ marginLeft: ".5rem" }}
            onClick={updateOrder}
          >
            <FontAwesomeIcon icon={faPencilAlt} />
          </button>
        </>
      )}
      <div className="text-muted text-tiny mt-1">
        <small className="font-weight-normal">{order[0].subject}</small>
      </div>
      <AlertModal
        id={"constModal"}
        body={"Вы действительно хотите удалить заявку?"}
        ok={deleteOrderHandler}
      />
    </h4>
  );
};
