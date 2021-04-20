import { useEffect, useRef, useState } from "react";

export const WhatsApp = () => {
  const [wOptions, setWOptions] = useState([]);

  const [checkedWOptions, setCheckedWOptions] = useState([]);

  const ref = useRef(null);
  useOutsideAlerter(ref);

  const toggle = () => {
    const select = document.querySelector(".w-checkbox-select");
    select.classList.add("open");
  };

  const getItem = (id, status) => {
    if (checkedWOptions.length > 0) {
      const checkInChecked = checkedWOptions.find((x) => x.id === id);

      if (!checkInChecked) {
        const index = wOptions.findIndex((x) => x.id === id);
        const item = wOptions.find((option) => option.id === id);
        let newOptions = [...wOptions];
        newOptions[index].checked = !status;

        setWOptions(newOptions);

        setCheckedWOptions([...checkedWOptions, item]);
      } else {
        const data = checkedWOptions.filter((x) => x.id !== checkInChecked.id);

        setCheckedWOptions(data);

        const index = wOptions.findIndex((x) => x.id === checkInChecked.id);
        let newOptions = [...wOptions];
        newOptions[index].checked = !status;

        setWOptions(newOptions);
      }
    } else {
      const index = wOptions.findIndex((x) => x.id === id);
      const item = wOptions.find((option) => option.id === id);
      let newOptions = [...wOptions];
      newOptions[index].checked = !status;

      setWOptions(newOptions);

      setCheckedWOptions([...checkedWOptions, item]);
    }
  };

  const removeItem = (id, status) => {
    const data = checkedWOptions.filter((option) => option.id !== id);
    setCheckedWOptions(data);

    const index = wOptions.findIndex((x) => x.id === id);
    let newOptions = [...wOptions];
    newOptions[index].checked = !status;

    setWOptions(newOptions);
  };

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (!ref.current.contains(event.target)) {
          document.querySelector(".w-checkbox-select").classList.remove("open");
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
      <h5 style={{ paddingBottom: "1rem" }}>WhatsApp-уведомления</h5>
      <div className="form-group aasd">
        <label className="form-label">WhatsApp-уведомления</label>
        <div className="w-checkbox-select" ref={ref}>
          <div className="select-input form-control" onClick={toggle}>
            <ul className="checked-inline-options">
              {checkedWOptions.map((option) => (
                <li className="checked-item" key={option.id}>
                  <span
                    className="checked-item__remove"
                    onClick={() => removeItem(option.id, option.checked)}
                  >
                    ×
                  </span>
                  {option.value}
                </li>
              ))}
            </ul>
          </div>
          <div className="select-dropdown">
            <ul className="select-list">
              {wOptions.map((option) => (
                <li
                  key={option.id}
                  className={`select-item ${
                    option.checked ? `checked` : `unchecked`
                  }`}
                  onClick={() => getItem(option.id, option.checked)}
                >
                  {option.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="alert alert-primary alert-whatsapp fade show">
        В данный момент этот вид уведомлений отключён в системе.
      </div>
      <div className="text-right" style={{ marginTop: ".5rem" }}>
        <button type="button" className="btn btn-primary" disabled>
          Сохранить
        </button>
      </div>
    </div>
  );
};
