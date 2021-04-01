import { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../../components/Navbar";
import { hideFullAlert } from "../../redux/actions/actions";
import { Loader } from "../../components/Loader";
import { FullAlert } from "../../components/FullAlert";
import {
  getTasks,
  getSpec,
  getSubSpec,
  updateOrder,
} from "../../redux/actions/orderActions";

export const UpdateOrder = () => {
  const location = useLocation();
  const history = useHistory();
  const userId = useSelector((state) => state.auth.data.userId);
  const updateData = location.state.updateData;
  const [form, setForm] = useState({
    task: updateData[0].task_id,
    spec: updateData[0].spec_id,
    sub_spec: updateData[0].sub_spec_id,
    priority: updateData[0].prioritet.toString(),
    subject: updateData[0].subject,
    description: updateData[0].description,
    userId: userId,
  });
  const [errors, setErrors] = useState(null);
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.app.loading);
  const tasks = useSelector((state) => state.order.tasks);
  const spec = useSelector((state) => state.order.spec);
  const sub_spec = useSelector((state) => state.order.sub_spec);

  useEffect(() => {
    dispatch(getTasks());
    dispatch(getSpec(updateData[0].task_id));
    dispatch(getSubSpec(updateData[0].spec_id));
  }, [dispatch, updateData]);

  useEffect(() => {
    setFiles(
      updateData[0].files.files.map((x) => {
        return { name: x, base64: "from order" };
      })
    );
  }, [updateData]);

  const openFileUpload = () => {
    const fileUpload = document.querySelector("#fileUpload");

    fileUpload.click();
  };

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
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
              base64: e.target.result.replace("data:image/png;base64,", ""),
            });
            setFiles([...files, ...obj]);
          };
        } else {
          reader.onload = (e) => {
            obj.push({
              name: file.name,
              base64: e.target.result.replace("data:image/jpeg;base64,", ""),
            });
            setFiles([...files, ...obj]);
          };
        }
      } else if (file.type.match("spreadsheetml")) {
        reader.onload = (e) => {
          obj.push({
            name: file.name,
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
            base64: e.target.result.replace("data:text/plain;base64,", ""),
          });
          setFiles([...files, ...obj]);
        };
      }

      reader.readAsDataURL(file);
    });
  };

  const fileRemoveHandler = (name) => {
    const data = files.filter((el) => el.name !== name);
    setFiles(data);
  };

  const updateOrderHandler = (event) => {
    event.preventDefault();
    dispatch(hideFullAlert());

    const error = validationForm();
    const noErrors = Object.keys(error).length === 0;

    if (!noErrors) {
      setErrors(error);
    } else {
      setErrors(null);
      dispatch(updateOrder(updateData[0].id, form, files));
      history.push(`/orders/${updateData[0].id}`);
    }
  };

  const validationForm = () => {
    const errors = {};
    if (!form.task) {
      errors.task = "Укажите характер вопроса!";
    }
    if (!form.subject) {
      errors.subject = "Заполните поле тема!";
    }
    if (!form.description) {
      errors.description = "Заполните поле описание!";
    }
    if (spec) {
      if (spec.length) {
        if (!form.spec) {
          errors.spec = "Укажите спецификацию!";
        }
      }
    }
    if (sub_spec) {
      if (sub_spec.length) {
        if (!form.sub_spec) {
          errors.sub_spec = "Укажите под спецификацию!";
        }
      }
    }

    return errors;
  };

  const closeFullAlert = () => {
    setErrors(null);
  };

  useEffect(() => {
    if (spec) {
      if (!spec.length) {
        setForm((f) => ({ ...f, spec: "", sub_spec: "" }));
        dispatch(getSubSpec(9999));
      }
    }
  }, [spec, dispatch]);

  const taskHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });

    dispatch(getSpec(event.target.value));
  };

  const specHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value, sub_spec: "" });

    dispatch(getSubSpec(event.target.value));
  };

  return (
    <div className="layout-container">
      <Navbar />
      <div className="layout-content">
        <div className="create-order-section container-fluid flex-grow-1 container-p-y">
          <h4 className="font-weight-bold mb-4">
            Редактирование заявки
            <div className="text-muted text-tiny mt-1">
              <small className="font-weight-normal">Основная информация</small>
            </div>
          </h4>
          <form>
            <div className="row">
              <div className="col-md-12">
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="form-group row">
                      <div className="full-alert-section">
                        {errors ? (
                          <FullAlert
                            message={{ type: "danger", errors }}
                            type={"danger"}
                            section={true}
                            close={closeFullAlert}
                          />
                        ) : null}
                      </div>
                    </div>
                    {/* Характер вопроса */}
                    <div className="form-group row">
                      <label
                        htmlFor="task"
                        className="col-form-label col-sm-2 text-sm-right"
                      >
                        Характер вопроса *
                      </label>
                      <div className="col-sm-10">
                        <select
                          className="form-select"
                          value={form.task}
                          onChange={taskHandler}
                          id="task"
                          name="task"
                        >
                          <option value="Укажите..." disabled>
                            Укажите...
                          </option>
                          {tasks
                            ? tasks.map((el) => {
                                return (
                                  <option value={el.id} key={el.id}>
                                    {el.name}
                                  </option>
                                );
                              })
                            : null}
                        </select>
                      </div>
                    </div>
                    {/* Спецификация */}
                    {spec ? (
                      spec.length ? (
                        <div className="form-group row spec">
                          <label
                            htmlFor="spec"
                            className="col-form-label col-sm-2 text-sm-right"
                          >
                            Спецификация *
                          </label>
                          <div className="col-sm-10">
                            <select
                              className="form-select"
                              onChange={specHandler}
                              value={
                                form.spec === ""
                                  ? spec
                                    ? spec.length && "Укажите..."
                                    : form.spec
                                  : form.spec
                              }
                              id="spec"
                              name="spec"
                            >
                              <option value="Укажите..." disabled>
                                Укажите...
                              </option>
                              {spec.map((el) => {
                                return (
                                  <option value={el.id} key={el.id}>
                                    {el.name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                      ) : null
                    ) : null}
                    {/* Под Спецификация */}
                    {spec ? (
                      spec.length && sub_spec ? (
                        sub_spec.length ? (
                          <div className="form-group row spec">
                            <label
                              htmlFor="sub_spec"
                              className="col-form-label col-sm-2 text-sm-right"
                            >
                              Под спецификация *
                            </label>
                            <div className="col-sm-10">
                              <select
                                className="form-select"
                                onChange={changeHandler}
                                value={
                                  form.sub_spec === ""
                                    ? sub_spec
                                      ? sub_spec.length && "Укажите..."
                                      : form.sub_spec
                                    : form.sub_spec
                                }
                                id="sub_spec"
                                name="sub_spec"
                              >
                                <option value="Укажите..." disabled>
                                  Укажите...
                                </option>
                                {sub_spec.map((el) => {
                                  return (
                                    <option value={el.id} key={el.id}>
                                      {el.name}{" "}
                                      {el.description &&
                                        `(` + el.description + `)`}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                        ) : null
                      ) : null
                    ) : null}
                    <div className="form-group row">
                      <label
                        htmlFor="priority"
                        className="col-form-label col-sm-2 text-sm-right"
                      >
                        Приоритет
                      </label>
                      <div
                        className="col-sm-10"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="priority"
                            onChange={changeHandler}
                            checked={form.priority === "1"}
                            id="low"
                            value="1"
                          />
                          <label className="form-check-label" htmlFor="low">
                            Низкий
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="priority"
                            onChange={changeHandler}
                            checked={form.priority === "2"}
                            id="middle"
                            value="2"
                          />
                          <label className="form-check-label" htmlFor="middle">
                            Средний
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="priority"
                            onChange={changeHandler}
                            checked={form.priority === "3"}
                            id="high"
                            value="3"
                          />
                          <label className="form-check-label" htmlFor="high">
                            Высокий
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="subject"
                        className="col-form-label col-sm-2 text-sm-right"
                      >
                        Тема *
                      </label>
                      <div className="col-sm-10">
                        <div className="input-group mb-3">
                          <input
                            type="text"
                            className="form-control"
                            autoComplete="false"
                            onChange={changeHandler}
                            value={form.subject}
                            id="subject"
                            name="subject"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="description"
                        className="col-form-label col-sm-2 text-sm-right"
                      >
                        Описание *
                      </label>
                      <div className="col-sm-10">
                        <div className="desc-editor">
                          <textarea
                            id="description"
                            name="description"
                            className="form-control"
                            onChange={changeHandler}
                            placeholder="Напишите текст..."
                            value={form.description}
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
                                  onClick={() => fileRemoveHandler(file.name)}
                                >
                                  &times;
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-2"></div>
                      <div className="col-sm-10">
                        <div className="add-order-btn">
                          <button
                            className="btn btn-success"
                            style={{ marginRight: "0.5rem" }}
                            onClick={updateOrderHandler}
                            disabled={loading && true}
                          >
                            {loading ? <Loader /> : "Редактировать заявку"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
