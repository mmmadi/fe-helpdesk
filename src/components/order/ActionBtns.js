import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGavel } from "@fortawesome/free-solid-svg-icons";
import { faUnlock } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export const ActionBtns = ({
  takeToWork,
  doneWorkHandler,
  cancelOrderHandlder,
  userData,
  order,
  cancelData,
  doneData,
}) => {
  const checkCancel = () => {
    if (userData) {
      if (userData.isLock) {
        return true;
      }
    } else if (doneData) {
      if (doneData.isDone) {
        return true;
      } else {
        return true;
      }
    } else if (!cancelData && !userData && !doneData) {
      if (order[0].islock) {
        return true;
      } else if (order[0].isdone) {
        return true;
      } else {
        return false;
      }
    }
  };

  const checkDoneBtn = () => {
    if (cancelData) {
      if (cancelData.isCancel) {
        return true;
      } else {
        return false;
      }
    } else if (userData) {
      if (userData.isLock) {
        return false;
      } else {
        return true;
      }
    } else if (doneData) {
      if (doneData.isDone) {
        return false;
      } else {
        return false;
      }
    } else if (!cancelData && !userData && !doneData) {
      if (order[0].status === "Отклонена") {
        return true;
      } else if (order[0].islock) {
        return false;
      } else if (order[0].isdone) {
        return false;
      } else {
        return true;
      }
    }
  };

  const checkWork = () => {
    if (cancelData) {
      if (cancelData.isCancel) {
        return true;
      } else {
        return false;
      }
    } else if (userData) {
      if (userData.isLock && doneData && doneData.isDone) {
        return true;
      } else {
        return false;
      }
    } else if (doneData) {
      if (doneData.isDone) {
        return true;
      }
    } else if (!cancelData && !userData && !doneData) {
      if (order[0].status === "Отклонена") {
        return true;
      } else if (order[0].islock) {
        return false;
      } else if (order[0].isdone) {
        return true;
      } else {
        return false;
      }
    }
  };

  const cancel = (
    <button
      className="btn btn-danger"
      onClick={() => cancelOrderHandlder(1)}
      disabled={checkCancel()}
    >
      <FontAwesomeIcon icon={faTimes} className="icon" />
      Отменить
    </button>
  );

  const recancel = (
    <button
      className="btn btn-danger"
      onClick={() => cancelOrderHandlder(2)}
      disabled={checkCancel()}
    >
      <FontAwesomeIcon icon={faTimes} className="icon" />
      Вернуть
    </button>
  );

  const inwork = (
    <button
      className="btn btn-warning"
      onClick={() => takeToWork(1)}
      disabled={checkWork()}
    >
      <FontAwesomeIcon icon={faGavel} className="icon" />
      Взять в работу
    </button>
  );
  const rework = (
    <button
      className="btn btn-warning"
      onClick={() => takeToWork(2)}
      disabled={checkWork()}
    >
      <FontAwesomeIcon icon={faUnlock} className="icon" />
      Снять с обработки
    </button>
  );

  const done = (
    <button
      className="btn btn-success"
      disabled={checkDoneBtn()}
      onClick={() => doneWorkHandler(1)}
    >
      <FontAwesomeIcon icon={faCheck} className="icon" />
      Выполнить
    </button>
  );

  const redone = (
    <button
      className="btn btn-success"
      disabled={checkDoneBtn()}
      onClick={() => doneWorkHandler(2)}
    >
      <FontAwesomeIcon icon={faTimes} className="icon" />
      Отменить выполнение
    </button>
  );

  return (
    <div className="card mb-1">
      <div className="card-body">
        <div className="btn-group btn-group-justified">
          <div className="btn-group">
            {cancelData
              ? cancelData.isCancel
                ? recancel
                : cancel
              : !order[0].iscancel
              ? cancel
              : recancel}
          </div>
          <div className="btn-group">
            {userData
              ? userData.isLock
                ? rework
                : inwork
              : doneData
              ? doneData.isDone
                ? rework
                : rework
              : !order[0].islock
              ? inwork
              : rework}
          </div>
          <div className="btn-group">
            {doneData
              ? doneData.isDone
                ? redone
                : done
              : order[0].isdone
              ? redone
              : done}
          </div>
        </div>
      </div>
    </div>
  );
};
