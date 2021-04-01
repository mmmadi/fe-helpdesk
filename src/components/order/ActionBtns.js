import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGavel } from "@fortawesome/free-solid-svg-icons";
import { faUnlock } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { CancelOrder } from "./CancelOrder";
import { cancelOrder } from "../../redux/actions/orderActions";

export const ActionBtns = ({
  takeToWork,
  doneWorkHandler,
  userData,
  order,
  cancelData,
  doneData,
}) => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth.data);
  const [cancelToggle, setCanceToggle] = useState(false);
  const [files, setFiles] = useState([]);
  const [form, setForm] = useState({
    comment: null,
    userId,
    user_ins: order[0].id_user_ins,
  });

  const checkCancel = () => {
    if (cancelData) {
      return true;
    } else if (userData) {
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
      if (order[0].status === "Отклонена") {
        return true;
      } else if (order[0].islock) {
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
      return true;
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
      return true;
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

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const openFileUpload = () => {
    const fileUpload = document.querySelector("#fileUpload");

    fileUpload.click();
  };

  const fileChangeHandler = (event) => {
    if (!event.target.files.length) {
      return;
    }

    const data = Array.from(event.target.files);

    const obj = [];

    data.forEach((file) => {
      const reader = new FileReader();

      if (file.type.match("image")) {
        if (file.type.match("png")) {
          reader.onload = (e) => {
            obj.push({
              name: file.name,
              base64: e.target.result.replace("data:image/png;base64,", ""),
            });
            setFiles([...files, ...obj]);
          };
        } else {
          reader.onload = (e) => {
            obj.push({
              name: file.name,
              base64: e.target.result.replace("data:image/jpeg;base64,", ""),
            });
            setFiles([...files, ...obj]);
          };
        }
      }

      reader.readAsDataURL(file);
    });
  };

  const cancelHandler = (event) => {
    event.preventDefault();
    dispatch(cancelOrder(order[0].id, form, files));
    setCanceToggle(false);
  };

  const fileRemoveHandler = (name) => {
    const data = files.filter((el) => el.name !== name);
    setFiles(data);
  };

  return (
    <div className="card mb-1">
      <div className="card-body">
        <div className="btn-group btn-group-justified">
          <div className="btn-group">
            <button
              className="btn btn-danger"
              onClick={() => setCanceToggle((cancelToggle) => !cancelToggle)}
              disabled={checkCancel()}
            >
              <FontAwesomeIcon icon={faTimes} className="icon" />
              Отменить
            </button>
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
        <div id="cancel-order" className="cancel-order">
          {cancelToggle && (
            <CancelOrder
              openFileUpload={openFileUpload}
              fileChangeHandler={fileChangeHandler}
              changeHandler={changeHandler}
              cancelHandler={cancelHandler}
              fileRemoveHandler={fileRemoveHandler}
              files={files}
            />
          )}
        </div>
      </div>
    </div>
  );
};
