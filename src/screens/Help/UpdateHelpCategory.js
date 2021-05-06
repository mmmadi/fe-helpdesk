import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Iconpicker } from "../../components/help/Iconpicker";
import { Navbar } from "../../components/Navbar";
import { updateCategory } from "../../redux/actions/helpActions";

export const UpdateHelpCategory = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const icons = require("@fortawesome/free-solid-svg-icons");
  const [categoryName, setCategoryName] = useState(location.state.name);
  const [currentIcon, setCurrentIcon] = useState(location.state.icon);
  const [page, setPage] = useState(1);
  const [searchedIcons, setSearchedIcons] = useState([]);

  const toggleIconpicker = () => {
    const popover = document.getElementById("popover");

    const currentPage = searchedIcons.findIndex((x) => x === currentIcon);
    setPage(Math.ceil((currentPage + 1) / 16));

    if (popover.style.display === "block") {
      popover.style.display = "none";
    } else {
      popover.style.display = "block";
    }
  };

  const closePicker = () => {
    const popover = document.getElementById("popover");
    popover.style.display = "none";
  };

  const getIcon = (name) => {
    setCurrentIcon(name);

    closePicker();
  };

  const updateHelpHandler = () => {
    dispatch(updateCategory(location.state.id, categoryName, currentIcon));
    history.push("/help/edit/category");
  };

  return (
    <div className="layout-container">
      <Navbar />
      <div className="layout-content">
        <div className="help-section container-fluid flex-grow-1 container-p-y">
          <h4 className="font-weight-bold mb-4">
            <FontAwesomeIcon icon={icons["faGraduationCap"]} className="icon" />
            Редактирование категории
          </h4>
          <div className="row">
            <div className="col-sm-12">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="form-group row mb-3">
                    <label
                      htmlFor="name"
                      className="col-form-label col-sm-2 text-sm-right"
                    >
                      Название
                    </label>
                    <div className="col-sm-10">
                      <input
                        className="form-control"
                        placeholder=""
                        name="name"
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-3">
                    <label
                      htmlFor="name"
                      className="col-form-label col-sm-2 text-sm-right"
                    >
                      Иконка
                    </label>
                    <div className="col-sm-10 dropdown-iconpicker">
                      <button
                        className="btn btn-default iconpicker dropdown-toggle "
                        type="button"
                        onClick={toggleIconpicker}
                      >
                        <FontAwesomeIcon
                          icon={icons[currentIcon]}
                          className="icon"
                        />
                      </button>
                      <Iconpicker
                        currentIcon={currentIcon}
                        getIcon={getIcon}
                        page={page}
                        setPage={setPage}
                        searchedIcons={searchedIcons}
                        setSearchedIcons={setSearchedIcons}
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-3">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-5">
                      <button
                        type="button"
                        className="btn btn-outline-success"
                        onClick={updateHelpHandler}
                      >
                        <FontAwesomeIcon
                          icon={icons["faCheckCircle"]}
                          className="icon"
                        />
                        Сохранить
                      </button>
                    </div>
                    <div className="col-sm-5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
