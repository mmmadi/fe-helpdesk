import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../components/Loader";
import { changePassword } from "../../redux/actions/profileActions";

export const ChangePassword = ({ getErrors }) => {
  const [newPass, setNewPass] = useState(null);
  const [repeatPass, setRepeatPass] = useState(null);
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth.data);
  const loading = useSelector((state) => state.app.loading);

  const changePasswordHandler = () => {
    if (!newPass || !repeatPass) {
      return getErrors({ message: "Заполните пустые поля!", type: "warning" });
    }
    if (newPass !== repeatPass) {
      return getErrors({ message: "Пароли не совпадают!", type: "warning" });
    }
    dispatch(changePassword(userId, newPass));
  };

  return (
    <div
      className="tab-pane fade"
      id="account-change-password"
      role="tabpanel"
      aria-labelledby="account-change-password-tab"
    >
      <div className="card-body">
        <div className="form-group">
          <label className="form-label">Новый пароль</label>
          <input
            type="password"
            className="form-control mb-1"
            name="newPass"
            onChange={(e) => setNewPass(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Повторите новый пароль</label>
          <input
            type="password"
            className="form-control mb-1"
            name="repeatPass"
            onChange={(e) => setRepeatPass(e.target.value)}
          />
        </div>
        <div className="text-right mt-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={changePasswordHandler}
            disabled={loading && true}
          >
            {loading ? <Loader /> : "Сохранить"}
          </button>
        </div>
      </div>
    </div>
  );
};
