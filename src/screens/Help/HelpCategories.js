import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar } from "../../components/Navbar";
import { FullAlert } from "../../components/FullAlert";
import {
  deleteCategory,
  getHelpCategories,
} from "../../redux/actions/helpActions";
import { AlertModal } from "../../components/const/AlertModal";

export const HelpCategories = () => {
  const icons = require("@fortawesome/free-solid-svg-icons");
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  const categories = useSelector((state) => state.help.categories);
  const alert = useSelector((state) => state.app.fullAlert);

  useEffect(() => {
    dispatch(getHelpCategories());
  }, [dispatch]);

  const closeModal = () => {
    const constModal = document.getElementById("cancel-button");

    constModal.click();
  };

  const deleteCategoryHandler = (id) => {
    dispatch(deleteCategory(id));
    closeModal();
  };

  if (!categories) {
    return (
      <div className="layout-container">
        <Navbar />
        <div className="layout-content">
          <div className="help-categories-section container-fluid flex-grow-1 container-p-y">
            <h4 className="font-weight-bold mb-4">
              <FontAwesomeIcon icon={icons["faListAlt"]} className="icon" />
              Категории
            </h4>
            <hr className="container-m-nx border-light mt-0"></hr>
            <div className="mb-4">
              <Link to="/help/add/category" className="btn btn-default btn-sm">
                Добавить
              </Link>
            </div>
            <div className="row">
              <div className="card card-body p-4 col-sm-12 dd">
                Категорий нет...
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="layout-container">
      <Navbar />
      <div className="layout-content">
        <div className="help-section container-fluid flex-grow-1 container-p-y">
          <h4 className="font-weight-bold mb-4">
            <FontAwesomeIcon icon={icons["faListAlt"]} className="icon" />
            Категории
          </h4>
          <hr className="container-m-nx border-light mt-0"></hr>
          <div className="mb-4">
            <Link to="/help/add/category" className="btn btn-default btn-sm">
              Добавить
            </Link>
          </div>
          <div className="full-alert-section">
            {alert ? (
              <FullAlert message={alert} type={"success"} section={true} />
            ) : null}
          </div>
          <div className="row">
            <div className="card card-body p-4 col-sm-12 dd">
              <ol className="dd-list">
                {categories.data.map((x) => (
                  <li className="dd-item" key={x.id}>
                    <div className="dd-handle">
                      <FontAwesomeIcon
                        icon={icons[x.icon]}
                        className="text-muted icon dd-icon"
                      />
                    </div>
                    <div className="dd-content">
                      {x.name}
                      <span className="float-right">
                        <Link
                          to={{
                            pathname: `/help/edit/category/${x.id}`,
                            state: { id: x.id, name: x.name, icon: x.icon },
                          }}
                          className="btn btn-xs btn-outline-primary mr-1"
                        >
                          <FontAwesomeIcon icon={icons["faEdit"]} />
                        </Link>
                        <button
                          type="button"
                          className="btn btn-xs btn-outline-danger"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteCategory"
                          onClick={() => setCurrentId(x.id)}
                        >
                          <FontAwesomeIcon icon={icons["faTrashAlt"]} />
                        </button>
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
              <AlertModal
                id={"deleteCategory"}
                body={
                  "Действительно желаете удалить категорию и все материалы в ней?"
                }
                ok={deleteCategoryHandler}
                elId={currentId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
