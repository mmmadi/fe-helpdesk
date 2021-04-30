import DefUser from "../../images/def-user.png";
import { server } from "../../config/config.json";

export const OrderCreator = ({ id, img, fio, struct }) => {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="card-title with-elements">
          <h5 className="m-0 mr-2">Заявитель</h5>
        </div>
        <div className="contact-content">
          <div className="position-relative">
            {img ? (
              <img
                src={`${server}/static/users/${id}/${img}`}
                className="contact-content-img rounded-circle"
                alt="user_avatar"
              />
            ) : (
              <img
                src={DefUser}
                className="contact-content-img rounded-circle"
                alt="user_avatar"
              />
            )}
          </div>
          <div className="contact-content-about">
            <h5 className="contact-content-name mb-1">
              <span className="text-body">{fio}</span>
            </h5>
            <div className="small">{struct}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
