import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { deleteItem } from "../../redux/actions/helpActions";
import { Navbar } from "../../components/Navbar";
import { server } from "../../config/config.json";
import { AlertModal } from "../../components/const/AlertModal";

export const HelpItem = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    id,
    name,
    category_name,
    text,
    files,
    date,
    help_category_id,
  } = location.state.item;

  const closeModal = () => {
    const constModal = document.getElementById("cancel-button");

    constModal.click();
  };

  const deleteItemHandler = () => {
    dispatch(deleteItem(id, help_category_id));

    closeModal();

    history.push("/help");
  };

  return (
    <div className="layout-container">
      <Navbar />
      <div className="layout-content">
        <div className="help-section container-fluid flex-grow-1 container-p-y">
          <h4 className="d-flex justify-content-between align-items-center w-100 font-weight-bold py-0 mb-4">
            <div>
              {name}
              <div className="text-muted text-tiny mt-1">
                <small className="font-weight-normal">{category_name}</small>
              </div>
            </div>
            <div className="btn-group btn-group-xs">
              <Link
                to={{
                  pathname: `/help/edit/item/${id}`,
                  state: { update_item: location.state.item },
                }}
                className="btn btn-xs btn-outline-primary d-block"
              >
                Редактировать
              </Link>
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#deleteItem"
                className="btn btn-xs btn-outline-danger d-block"
              >
                Удалить
              </button>
            </div>
          </h4>
          <div className="row">
            <div className="col-sm-12">
              <div className="card mb-4">
                <div className="card-body" style={{ padding: "1.5rem" }}>
                  <p>{name}</p>
                  <hr />
                  <p></p>
                  <p>{text}</p>
                  <p></p>
                </div>
                <li className="list-group-item">
                  <div className="files-group">
                    {files.files.map((file, index) => {
                      return (
                        <div className="file-element" key={index}>
                          <span>
                            <a
                              href={`${server}/static/help/${id}/${file.hashname}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {file.name}
                            </a>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="text-muted small">
                    <span className="pull-right">{date}</span>
                  </div>
                </li>
              </div>
            </div>
          </div>
        </div>
        <AlertModal
          id={"deleteItem"}
          body={"Действительно желаете удалить материал?"}
          ok={deleteItemHandler}
        />
      </div>
    </div>
  );
};
