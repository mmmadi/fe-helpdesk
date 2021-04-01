import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FullAlert } from "../../components/FullAlert";
import DefUser from "../../images/def-user.png";
import { StatusChange } from "./StatusChange";
import { StatusStyle } from "../const/StatusStyle";
import { PriorityStyle } from "../const/PriorityStyle";

export const OrderBody = ({
  order,
  closeAlert,
  alert,
  userData,
  cancelData,
  doneData,
}) => {
  return (
    <div className="card mb-1">
      <div className="card-body">
        {alert && (
          <FullAlert message={alert} section={true} close={closeAlert} />
        )}
        <div className="row">
          <div className="col-sm-6 col-md-8 col-lg-7 col-xl-8">
            <div className="media align-item-center mb-1">
              <div className="position-relative">
                <img
                  src={DefUser}
                  alt="default user icon"
                  className="ui-w-50 rounded-circle"
                />
              </div>
              <div className="media-body ml-3">
                <h5 className="mb-1">{order[0].author}</h5>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-4 col-lg-5 col-xl-4">
            <div className="row no-gutters mb-1 pull-right">
              <div className="col py-1 px-3">
                <div className="text-muted small">
                  <span className="clock-time">
                    <FontAwesomeIcon icon={faClock} className="icon" />
                    {order[0].date_ins.toString("dd MM yyyy, hh:ss")}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12">
            <hr />
          </div>
          <div className="col-sm-12">
            <table>
              <tbody>
                <tr>
                  <td className="pr-3">Статус:</td>
                  <td>
                    <StatusStyle
                      status={StatusChange(
                        cancelData,
                        doneData,
                        userData,
                        order ? order[0].status : null
                      )}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pr-3">Приоритет:</td>
                  <td>
                    <PriorityStyle priority={order[0].priority} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-sm-12">
            <hr />
          </div>
          <h4 className="line-height-inherit m-0">{order[0].subject}</h4>
          <p></p>
          <p>{order[0].description}</p>
          <p></p>
          <div className="col-sm-12">
            <hr />
          </div>
          <div className="col-sm-12">
            <div className="files-group">
              {order[0].files.files.map((file, index) => {
                return (
                  <div className="file-element" key={index}>
                    <span>
                      <a
                        href={`http://localhost:5000/static/orders/${order[0].id}/${file}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {file}
                      </a>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
