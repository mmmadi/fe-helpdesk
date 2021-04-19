import { useEffect, useRef, useState } from "react";

export const Mail = () => {
  const [options, setOptions] = useState([
    {
      id: 1,
      value: "first",
      checked: true,
    },
    {
      id: 2,
      value: "second",
      checked: true,
    },
    {
      id: 3,
      value: "third",
      checked: true,
    },
  ]);

  const [checkedOptions, setCheckedOptions] = useState(options);

  const ref = useRef(null);
  useOutsideAlerter(ref);

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
                  {option.value}
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
                  {option.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
