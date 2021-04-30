import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExecutorFilter } from "../../redux/actions/orderFilterActions";
import { addOrderParty } from "../../redux/actions/orderActions";
import DefUser from "../../images/def-user.png";
import { server } from "../../config/config.json";

export const AddOrderParty = ({ orderPartyData, orderId }) => {
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const [checkedOptions, setCheckedOptions] = useState([]);

  const ref = useRef(null);
  useOutsideAlerter(ref);

  const { id_struct } = useSelector((state) => state.auth.data);
  const users = useSelector((state) => state.filter.f_executor);

  useEffect(() => {
    setCheckedOptions(orderPartyData);

    const newOptions = [];

    if (users && orderPartyData) {
      users.map((x) => {
        const param = orderPartyData.find((s) => s.id === x.id);
        if (param) {
          return newOptions.push({ ...x, checked: param.checked });
        } else {
          return newOptions.push({ ...x, checked: false });
        }
      });

      setOptions(newOptions);
    }
  }, [orderPartyData, users]);

  useEffect(() => {
    dispatch(getExecutorFilter(id_struct));
  }, [dispatch, id_struct]);

  const toggle = () => {
    const select = document.querySelector(".checkbox-select");
    select.classList.add("open");
  };

  const getItem = (id, status) => {
    if (checkedOptions.length > 0) {
      const checkInChecked = checkedOptions.find((x) => x.id === id);

      if (!checkInChecked) {
        const index = options.findIndex((x) => x.id === id);
        const item = options.find((option) => option.id === id);
        let newOptions = [...options];
        newOptions[index].checked = !status;

        setOptions(newOptions);

        setCheckedOptions([...checkedOptions, item]);
      } else {
        const data = checkedOptions.filter((x) => x.id !== checkInChecked.id);

        setCheckedOptions(data);

        const index = options.findIndex((x) => x.id === checkInChecked.id);
        let newOptions = [...options];
        newOptions[index].checked = !status;

        setOptions(newOptions);
      }
    } else {
      const index = options.findIndex((x) => x.id === id);
      const item = options.find((option) => option.id === id);
      let newOptions = [...options];
      newOptions[index].checked = !status;

      setOptions(newOptions);

      setCheckedOptions([...checkedOptions, item]);
    }
  };

  const removeItem = (id, status) => {
    const data = checkedOptions.filter((option) => option.id !== id);
    setCheckedOptions(data);

    const index = options.findIndex((x) => x.id === id);
    let newOptions = [...options];
    newOptions[index].checked = !status;

    setOptions(newOptions);
  };

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (!ref.current.contains(event.target)) {
          document.querySelector(".checkbox-select").classList.remove("open");
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    });
  }

  const changeOrderParty = () => {
    dispatch(addOrderParty(orderId, checkedOptions));
  };

  return (
    <div
      className="modal fade"
      id="addOrderParty"
      tabIndex="-1"
      aria-labelledby="addOrderPartyLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addOrderPartyLabel">
              Добавить участника
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="form-group row">
              <div className="col-sm-12">
                <div className="checkbox-select" ref={ref}>
                  <div className="select-input form-control" onClick={toggle}>
                    <ul className="checked-inline-options">
                      {checkedOptions
                        ? checkedOptions.map((option) => (
                            <li className="checked-item" key={option.id}>
                              <span
                                className="checked-item__remove"
                                onClick={() =>
                                  removeItem(option.id, option.checked)
                                }
                              >
                                ×
                              </span>
                              {option.fio}
                            </li>
                          ))
                        : null}
                    </ul>
                  </div>
                  <div className="select-dropdown">
                    <ul className="select-list">
                      {options.map((x) => (
                        <li
                          key={x.id}
                          className={`select-item ${
                            x.checked ? `checked` : `unchecked`
                          }`}
                          onClick={() => getItem(x.id, x.checked)}
                        >
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={x.checked}
                            readOnly
                          />
                          {x.fio}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              {orderPartyData ? (
                <ul className="col-sm-12">
                  <hr />
                  {orderPartyData.map((user) => (
                    <li key={user.id} className="media p-2">
                      <div className="media-body">
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
                        <span style={{ marginLeft: ".5rem" }}>{user.fio}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={changeOrderParty}
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
