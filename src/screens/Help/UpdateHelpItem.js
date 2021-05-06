import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { Navbar } from "../../components/Navbar";
import { getHelpCategories, updateItem } from "../../redux/actions/helpActions";

export const UpdateHelpItem = () => {
  const location = useLocation();
  const data = location.state.update_item;
  const dispatch = useDispatch();
  const history = useHistory();
  const icons = require("@fortawesome/free-solid-svg-icons");
  const [files, setFiles] = useState([]);
  const [name, setName] = useState(data.name);
  const [categoryId, setCategoryId] = useState(data.help_category_id);
  const [text, setText] = useState(data.text);

  useEffect(() => {
    dispatch(getHelpCategories());
  }, [dispatch]);

  const categories = useSelector((state) => state.help.categories);

  useEffect(() => {
    setFiles(
      data.files.files.map((x) => {
        return { name: x.name, hashName: x.hashname, base64: "from order" };
      })
    );
  }, [data]);

  const openFileUpload = () => {
    const fileUpload = document.querySelector("#fileUpload");

    fileUpload.click();
  };

  const fileChangeHandler = (event) => {
    if (!event.target.files.length) {
      return;
    }

    const data = Array.from(event.target.files);

    const obj = [];

    data.forEach((file) => {
      const reader = new FileReader();

      if (file.type.match("image")) {
        if (file.type.match("png")) {
          reader.onload = (e) => {
            obj.push({
              name: file.name,
              hashName: `${Date.now().toString()}_` + file.name,
              base64: e.target.result.replace("data:image/png;base64,", ""),
            });
            setFiles([...files, ...obj]);
          };
        } else {
          reader.onload = (e) => {
            obj.push({
              name: file.name,
              hashName: `${Date.now().toString()}_` + file.name,
              base64: e.target.result.replace("data:image/jpeg;base64,", ""),
            });
            setFiles([...files, ...obj]);
          };
        }
      } else if (file.type.match("spreadsheetml")) {
        reader.onload = (e) => {
          obj.push({
            name: file.name,
            hashName: `${Date.now().toString()}_` + file.name,
            base64: e.target.result.replace(
              "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,",
              ""
            ),
          });
          setFiles([...files, ...obj]);
        };
      } else if (file.type.match("wordprocessingml")) {
        reader.onload = (e) => {
          obj.push({
            name: file.name,
            hashName: `${Date.now().toString()}_` + file.name,
            base64: e.target.result.replace(
              "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,",
              ""
            ),
          });
          setFiles([...files, ...obj]);
        };
      } else if (file.type.match("text")) {
        reader.onload = (e) => {
          obj.push({
            name: file.name,
            hashName: `${Date.now().toString()}_` + file.name,
            base64: e.target.result.replace("data:text/plain;base64,", ""),
          });

          setFiles([...files, ...obj]);
        };
      }

      reader.readAsDataURL(file);
    });
  };
  const fileRemoveHandler = (name) => {
    const data = files.filter((el) => el.hashName !== name);
    setFiles(data);
  };
  const updateHelpItemHandler = () => {
    dispatch(updateItem(data.id, name, categoryId, text, files));
    history.push("/help");
  };

  return (
    <div className="layout-container">
      <Navbar />
      <div className="layout-content">
        <div className="update-help-item-section container-fluid flex-grow-1 container-p-y">
          <h4 className="font-weight-bold mb-4">
            <FontAwesomeIcon icon={icons["faGraduationCap"]} className="icon" />
            Редактирование материала
            <div className="text-muted text-tiny mt-1">
              <small className="font-weight-normal">Редактирование</small>
            </div>
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
                      Название *
                    </label>
                    <div className="col-sm-10">
                      <input
                        className="form-control"
                        placeholder=""
                        name="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-3">
                    <label
                      htmlFor="category"
                      className="col-form-label col-sm-2 text-sm-right"
                    >
                      Категория *
                    </label>
                    <div className="col-sm-10">
                      <select
                        className="form-select"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        name="category"
                      >
                        <option value="Укажите..." disabled>
                          Укажите...
                        </option>
                        {categories
                          ? categories.data.map((cat) => (
                              <option value={cat.id} key={cat.id}>
                                {cat.name}
                              </option>
                            ))
                          : null}
                      </select>
                    </div>
                  </div>
                  <div className="form-group row mb-3">
                    <label
                      htmlFor="text"
                      className="col-form-label col-sm-2 text-sm-right"
                    >
                      Текст *
                    </label>
                    <div className="col-sm-10">
                      <div className="desc-editor">
                        <textarea
                          name="text"
                          className="form-control"
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          placeholder="Напишите текст..."
                          style={{ height: 200 }}
                        ></textarea>
                        <div className="desc-footer">
                          <div className="desc-footer-upload">
                            <button
                              type="button"
                              onClick={openFileUpload}
                              className="file-upload-btn"
                            >
                              Загрузить файл...
                            </button>
                            <input
                              id="fileUpload"
                              multiple
                              onChange={fileChangeHandler}
                              accept=".png, .jpg, .jpeg, .doc, .docx, .xls, .xlsx, .txt"
                              type="file"
                              style={{ display: "none" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-10">
                      <div className="files-group">
                        {files.map((file, index) => {
                          return (
                            <div className="file-element" key={index}>
                              <span key={index}>{file.name}</span>
                              <button
                                type="button"
                                className="close-button"
                                onClick={() => fileRemoveHandler(file.hashName)}
                              >
                                &times;
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="form-group row mb-3">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-5">
                      <button
                        type="button"
                        className="btn btn-outline-success"
                        onClick={updateHelpItemHandler}
                      >
                        <FontAwesomeIcon
                          icon={icons["faCheckCircle"]}
                          className="icon"
                        />
                        Создать
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
