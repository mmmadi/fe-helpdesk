import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { icon_list } from "../const/faIcons";

export const Iconpicker = ({
  currentIcon,
  getIcon,
  page,
  setPage,
  searchedIcons,
  setSearchedIcons,
}) => {
  const icons = require("@fortawesome/free-solid-svg-icons");

  const step_first = page * 16 - 16;
  const step_one = page * 16 - 12;
  const step_two = page * 16 - 8;
  const step_three = page * 16 - 4;
  const step_four = page * 16;

  useEffect(() => {
    setSearchedIcons(icon_list);
  }, [setSearchedIcons]);

  const checkDisable = (param) => {
    if (param === 1) {
      if (page === 1) {
        return true;
      }
      return false;
    } else {
      if (page === Math.ceil(searchedIcons.length / 16)) {
        return true;
      }
      return false;
    }
  };

  const minus = () => {
    if (page === 1) {
      return;
    }
    setPage(page - 1);
  };

  const plus = () => {
    if (page === Math.ceil(searchedIcons.length / 16)) {
      return;
    }
    setPage(page + 1);
  };

  const searchIconHandler = (e) => {
    setPage(1);
    const searched = icon_list.filter(
      (x) => x.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
    );
    setSearchedIcons(searched);
  };

  return (
    <div
      className="popover iconpicker-popover show bs-popover-bottom"
      id="popover"
    >
      <div className="arrow"></div>
      <div className="popover-body">
        <table className="table-icons">
          <thead>
            <tr>
              <td className="text-center">
                <button
                  className="btn btn-arrow btn-previous btn-primary"
                  type="button"
                  disabled={checkDisable(1)}
                  onClick={minus}
                >
                  <FontAwesomeIcon icon={icons["faArrowLeft"]} />
                </button>
              </td>
              <td className="text-center" colSpan="2">
                <span className="page-count">
                  {page} / {Math.ceil(searchedIcons.length / 16)}
                </span>
              </td>
              <td className="text-center">
                <button
                  className="btn btn-arrow btn-next btn-primary"
                  type="button"
                  disabled={checkDisable(2)}
                  onClick={plus}
                >
                  <FontAwesomeIcon icon={icons["faArrowRight"]} />
                </button>
              </td>
            </tr>
            <tr>
              <td colSpan="4">
                <input
                  type="search"
                  className="form-control search-control"
                  placeholder="Поиск иконки"
                  onChange={searchIconHandler}
                />
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              {searchedIcons.slice(step_first, step_one).map((el, index) => (
                <td key={index}>
                  <button
                    className={
                      "btn btn-secondary btn-icon" +
                      (el === currentIcon
                        ? " btn-warning btn-icon-selected"
                        : "")
                    }
                    onClick={() => getIcon(el)}
                  >
                    <FontAwesomeIcon icon={icons[el]} />
                  </button>
                </td>
              ))}
            </tr>
            <tr>
              {searchedIcons.slice(step_one, step_two).map((el, index) => (
                <td key={index}>
                  <button
                    className={
                      "btn btn-secondary btn-icon" +
                      (el === currentIcon
                        ? " btn-warning btn-icon-selected"
                        : "")
                    }
                    onClick={() => getIcon(el)}
                  >
                    <FontAwesomeIcon icon={icons[el]} />
                  </button>
                </td>
              ))}
            </tr>
            <tr>
              {searchedIcons.slice(step_two, step_three).map((el, index) => (
                <td key={index}>
                  <button
                    className={
                      "btn btn-secondary btn-icon" +
                      (el === currentIcon
                        ? " btn-warning btn-icon-selected"
                        : "")
                    }
                    onClick={() => getIcon(el)}
                  >
                    <FontAwesomeIcon icon={icons[el]} />
                  </button>
                </td>
              ))}
            </tr>
            <tr>
              {searchedIcons.slice(step_three, step_four).map((el, index) => (
                <td key={index}>
                  <button
                    className={
                      "btn btn-secondary btn-icon" +
                      (el === currentIcon
                        ? " btn-warning btn-icon-selected"
                        : "")
                    }
                    onClick={() => getIcon(el)}
                  >
                    <FontAwesomeIcon icon={icons[el]} />
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4" className="text-center">
                <span className="icons-count">
                  {step_first + 1} -{" "}
                  {page === Math.ceil(searchedIcons.length / 16)
                    ? searchedIcons.length
                    : step_four}{" "}
                  of {searchedIcons.length}
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
