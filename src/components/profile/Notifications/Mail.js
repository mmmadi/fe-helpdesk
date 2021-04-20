import { useEffect, useRef, useState } from "react";

export const Mail = ({
  notifications,
  userNotifications,
  changeNotifyHandler,
}) => {
  const [options, setOptions] = useState([]);
  const [checkedOptions, setCheckedOptions] = useState([]);

  const ref = useRef(null);
  useOutsideAlerter(ref);

  useEffect(() => {
    setCheckedOptions(userNotifications);

    const newOptions = [];

    notifications.map((x) => {
      const param = userNotifications.find((s) => s.id === x.id);

      if (param) {
        return newOptions.push({ ...x, checked: param.checked });
      } else {
        return newOptions.push({ ...x, checked: false });
      }
    });

    setOptions(newOptions);
  }, [notifications, userNotifications]);

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

  return (
    <div className="card-body pb-2">
      <h5 style={{ paddingBottom: "1rem" }}>Mail-уведомления</h5>
      <div className="form-group aasd">
        <label className="form-label">Mail-уведомления</label>
        <div className="checkbox-select" ref={ref}>
          <div className="select-input form-control" onClick={toggle}>
            <ul className="checked-inline-options">
              {checkedOptions.map((option) => (
                <li className="checked-item" key={option.id}>
                  <span
                    className="checked-item__remove"
                    onClick={() => removeItem(option.id, option.checked)}
                  >
                    ×
                  </span>
                  {option.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="select-dropdown">
            <ul className="select-list">
              {options.map((option) => (
                <li
                  key={option.id}
                  className={`select-item ${
                    option.checked ? `checked` : `unchecked`
                  }`}
                  onClick={() => getItem(option.id, option.checked)}
                >
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={option.checked}
                    readOnly
                  />
                  {option.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="text-right" style={{ marginTop: ".5rem" }}>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => changeNotifyHandler(checkedOptions)}
        >
          Сохранить
        </button>
      </div>
    </div>
  );
};
