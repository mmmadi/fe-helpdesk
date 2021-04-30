import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import DefUser from "../../images/def-user.png";
import { server } from "../../config/config.json";
import { AddOrderParty } from "./AddOrderParty";

export const OrderParty = ({ orderPartyData, orderId, have_task }) => {
  return (
    <div className="card mb-3">
      <AddOrderParty orderPartyData={orderPartyData} orderId={orderId} />
      <div className="card-body">
        <div className="card-title with-elements">
          <h5 className="m-0 mr-2">Участники заявки</h5>
          <div className="card-title-elements ml-md-auto">
            {have_task && (
              <button
                type="button"
                className="btn btn-outline-secondary btn-xs"
                data-bs-toggle="modal"
                data-bs-target="#addOrderParty"
              >
                <FontAwesomeIcon icon={faUserPlus} />
              </button>
            )}
          </div>
        </div>
        <div className="d-flex justify-content-start flex-wrap">
          {orderPartyData
            ? orderPartyData.map((user) => (
                <div className="d-block mr-1 mb-1" key={user.id}>
                  <span>
                    <div className="position-relative">
                      {user.img ? (
                        <img
                          src={`${server}/static/users/${user.id}/${user.img}`}
                          alt="user icon"
                          className="ui-w-30 rounded-circle"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          title={`${user.fio}`}
                        />
                      ) : (
                        <img
                          src={DefUser}
                          alt="default user icon"
                          className="ui-w-30 rounded-circle"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          title={`${user.fio}`}
                        />
                      )}
                    </div>
                  </span>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
