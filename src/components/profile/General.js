import { useState } from "react";
import defUser from "../../images/def-user.png";
import { server } from "../../config/config.json";

export const General = ({ data, userImg, change, userId }) => {
  const [phone, setPhone] = useState("+7");

  const changeHandler = (event) => {
    setPhone(event.target.value);
  };

  const fileChangeHandler = (event) => {
    const file = event.target.files[0];
    console.log(file);

    const reader = new FileReader();
    if (file.type.match("png")) {
      reader.onload = (e) => {
        change({
          name: file.name,
          base64: e.target.result.replace("data:image/png;base64,", ""),
        });
      };
    } else {
      reader.onload = (e) => {
        change({
          name: file.name,
          base64: e.target.result.replace("data:image/jpeg;base64,", ""),
        });
      };
    }

    reader.readAsDataURL(file);
  };

  return (
    <div
      className="tab-pane fade active show"
      id="account-general"
      role="tabpanel"
      aria-labelledby="account-general-tab"
    >
      <div className="card-body media align-items-center">
        {userImg ? (
          <img
            src={`${server}/static/users/${userId}/${userImg}`}
            alt="user img"
            className="d-block ui-w-80"
          />
        ) : (
          <img src={defUser} alt="user img" className="d-block ui-w-80" />
        )}
        <div className="media-body ml-4">
          <label className="btn btn-outline-primary">
            Выбрать изоброжение
            <input
              type="file"
              id="user_img"
              onChange={fileChangeHandler}
              accept=".png, .jpg, .jpeg"
              className="account-settings-fileinput"
            />
          </label>
          <> &nbsp; </>
          <button
            type="button"
            id="reset_image"
            className="btn btn-default md-btn-flat"
          >
            Удалить
          </button>
          <div className="text-light small mt-1">Поддерживает JPG или PNG.</div>
        </div>
      </div>
      <hr className="border-light m-0" />
      <div className="card-body">
        <div className="form-group">
          <label className="form-label">Фамилия</label>
          <div className="form-control mb-1">Test</div>
        </div>
        <div className="form-group">
          <label className="form-label">Имя</label>
          <div className="form-control mb-1">Test</div>
        </div>
        <div className="form-group">
          <label className="form-label">Отчество</label>
          <div className="form-control mb-1">Test</div>
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <div className="form-control mb-1">Test@test.com</div>
        </div>
        <div className="form-group">
          <label className="form-label">Отдел</label>
          <div className="form-control mb-1">Test</div>
        </div>
        <div className="form-group">
          <label className="form-label">Телефон</label>
          <input
            type="text"
            value={phone}
            className="form-control mb-1"
            onChange={changeHandler}
          />
        </div>
        <hr />
        <div className="text-right mt-3">
          <button type="button" className="btn btn-primary">
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};
