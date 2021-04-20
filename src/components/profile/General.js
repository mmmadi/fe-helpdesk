import { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import defUser from "../../images/def-user.png";
import { server } from "../../config/config.json";

export const General = ({
  data,
  userImg,
  changeAvatar,
  changeGeneral,
  userId,
}) => {
  const [phone, setPhone] = useState("");

  const changeHandler = (event) => {
    const formated = event.target.value.replace("+7-", "");

    setPhone(formated.replaceAll(/[()-]/g, ""));
  };

  useEffect(() => {
    setPhone(data ? (data[0].phone ? data[0].phone : "") : "");
  }, [data]);

  const fileChangeHandler = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    if (file.type.match("png")) {
      reader.onload = (e) => {
        changeAvatar({
          name: file.name,
          base64: e.target.result.replace("data:image/png;base64,", ""),
        });
      };
    } else {
      reader.onload = (e) => {
        changeAvatar({
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
          <div className="form-control mb-1">
            {data ? data[0].surname : "Фамилия"}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Имя</label>
          <div className="form-control mb-1">{data ? data[0].name : "Имя"}</div>
        </div>
        <div className="form-group">
          <label className="form-label">Отчество</label>
          <div className="form-control mb-1">
            {data ? data[0].fathername : "Отчество"}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <div className="form-control mb-1">
            {data ? data[0].mail : "Email"}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Отдел</label>
          <div className="form-control mb-1">
            {data ? data[0].struct_name : "Отдел"}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Телефон</label>
          <NumberFormat
            format="+7-(###)-###-####"
            placeholder="+7-(777)-777-7777"
            mask="_"
            className="form-control mb-1"
            value={phone}
            onChange={changeHandler}
          />
        </div>
        <hr />
        <div className="text-right mt-3">
          <button
            type="button"
            className="btn btn-primary"
            disabled={phone.match("_") || phone === ""}
            onClick={() => changeGeneral(phone)}
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};
