import { LockAlert } from "../../components/order/LockAlert";

export const LockAlertChange = ({ doneData, userData, order, cancelData }) => {
  if (doneData) {
    if (doneData.isDone) {
      return (
        <LockAlert
          data={doneData}
          text={"Заявка выполнена пользователем"}
          type={"alert-dark-success"}
        />
      );
    } else if (!doneData.isDone) {
      if (userData) {
        if (!doneData.isDone && !userData.isLock) {
          return null;
        } else if (!doneData.isDone && userData.isLock) {
          return (
            <LockAlert
              data={userData ? userData : { userfio: order[0].inwork_user }}
              text={"Заявка заблокирована пользователем"}
              type={"alert-dark-warning"}
            />
          );
        }
      } else {
        return (
          <LockAlert
            data={userData ? userData : { userfio: order[0].inwork_user }}
            text={"Заявка заблокирована пользователем"}
            type={"alert-dark-warning"}
          />
        );
      }
    }
    return null;
  }

  if (userData) {
    if (userData.isLock) {
      return (
        <LockAlert
          data={userData}
          text={"Заявка заблокирована пользователем"}
          type={"alert-dark-warning"}
        />
      );
    } else {
      return null;
    }
  }

  if (cancelData) {
    if (cancelData.isCancel) {
      return (
        <LockAlert
          data={cancelData}
          text={"Заявка отменена пользователем"}
          type={"alert-dark-danger"}
        />
      );
    }
    return null;
  }

  if (!userData && !doneData && !cancelData) {
    if (order[0].islock) {
      return (
        <LockAlert
          data={{ userfio: order[0].owner }}
          text={"Заявка заблокирована пользователем"}
          type={"alert-dark-warning"}
        />
      );
    }
    if (order[0].isdone) {
      return (
        <LockAlert
          data={{ userfio: order[0].executor }}
          text={"Заявка выполнена пользователем"}
          type={"alert-dark-success"}
        />
      );
    }
    if (order[0].status === "Отклонена") {
      return (
        <LockAlert
          data={{ userfio: [order[0].cancel_user] }}
          text={"Заявка отменена пользователем"}
          type={"alert-dark-danger"}
        />
      );
    }
    return null;
  }
};
