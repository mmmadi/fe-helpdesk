import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faTimesCircle,
  faListUl,
} from "@fortawesome/free-solid-svg-icons";
import { Navbar } from "../../components/Navbar";
import { getFOrders, getOrders } from "../../redux/actions/orderActions";
import { DataTable } from "../../components/DataTable";
import {
  getExecutorFilter,
  getSpecFilter,
  getStatusFilter,
  getSubSpecFilter,
} from "../../redux/actions/orderFilterActions";
registerLocale("ru", ru);

export const Orders = () => {
  const [param, setParam] = useState(1);
  const [form, setForm] = useState({
    spec: "",
    sub_spec: "",
    executor: null,
    status: null,
    date_start: new Date(),
    date_end: new Date(),
  });
  const dispatch = useDispatch();
  const { userId, id_struct, have_task } = useSelector(
    (state) => state.auth.data
  );
  const orders = useSelector((state) => state.order.orders);
  const { f_spec, f_sub_spec, f_executor, f_status } = useSelector(
    (state) => state.filter
  );

  const getDataOrders = (elem) => {
    dispatch(getOrders(elem, userId, id_struct));
    setParam(elem);
  };

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const specHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value, sub_spec: "" });
    dispatch(getSubSpecFilter(event.target.value));
  };

  const getFilterOrders = () => {
    dispatch(getFOrders(param, userId, form));
  };

  const clearForm = () => {
    setForm({
      spec: "",
      sub_spec: "",
      executor: null,
      status: null,
      date_start: new Date(),
      date_end: new Date(),
    });

    document.querySelector("#spec").selectedIndex = 0;
    document.querySelector("#executor").selectedIndex = 0;
    document.querySelector("#status").selectedIndex = 0;
  };

  useEffect(() => {
    dispatch(getOrders(1, userId, id_struct));
    dispatch(getSpecFilter(id_struct));
    dispatch(getExecutorFilter(id_struct));
    dispatch(getStatusFilter());
  }, [dispatch, userId, id_struct]);

  useEffect(() => {
    if (have_task) {
      document
        .querySelector("#start")
        .insertAdjacentHTML(
          "beforebegin",
          `<label class="form-label">Начало</label`
        );
      document
        .querySelector("#end")
        .insertAdjacentHTML(
          "beforebegin",
          `<label class="form-label">Конец</label`
        );
    }
  }, [have_task]);

  return (
    <div className="layout-container">
      <Navbar />
      <div className="layout-content">
        <div className="order-list-section container-fluid flex-grow-1 container-p-y">
          <h4 className="font-weight-bold mb-4">
            <FontAwesomeIcon icon={faListUl} className="icon" />
            Заявки
            <div className="text-muted text-tiny mt-1">
              <small className="font-weight-normal">Список заявок</small>
            </div>
          </h4>
          <div className="row">
            <div className="col-md-12">
              <div className="card mb-4">
                <div className="card-body">
                  <div
                    className="btn-group order-type-btn-group"
                    role="group"
                    aria-label="Basic radio toggle button group"
                  >
                    {have_task ? (
                      <>
                        <input
                          type="radio"
                          className="btn-check"
                          name="ordertype"
                          id="inbox"
                          autoComplete="off"
                          defaultChecked
                          onClick={() => getDataOrders(1)}
                        />
                        <label
                          className="btn btn-outline-primary"
                          htmlFor="inbox"
                        >
                          Входящие
                        </label>
                        <input
                          type="radio"
                          className="btn-check"
                          name="ordertype"
                          id="outbox"
                          autoComplete="off"
                          onClick={() => getDataOrders(2)}
                        />
                        <label
                          className="btn btn-outline-primary"
                          htmlFor="outbox"
                        >
                          Исходящие
                        </label>
                      </>
                    ) : (
                      <>
                        <input
                          type="radio"
                          className="btn-check"
                          name="ordertype"
                          id="inbox"
                          autoComplete="off"
                          defaultChecked
                          onClick={() => getDataOrders(1)}
                        />
                        <label
                          className="btn btn-outline-primary"
                          htmlFor="inbox"
                          style={{ marginBottom: ".5rem" }}
                        >
                          Мои заявки
                        </label>
                      </>
                    )}
                  </div>
                  {have_task ? (
                    <div className="ui-bordered px-4 pt-4 mb-4">
                      <div className="form-row">
                        {/* Спецификация */}
                        <div className="col-md mb-4 p-s-5">
                          <label className="form-label">Спецификация</label>
                          <select
                            className="form-select filter-control f-select"
                            defaultValue="Укажите..."
                            onChange={specHandler}
                            id="spec"
                            name="spec"
                          >
                            <option value="Укажите..." disabled>
                              Укажите...
                            </option>
                            {f_spec
                              ? f_spec.map((elem) => {
                                  return (
                                    <option value={elem.id} key={elem.id}>
                                      {elem.name}
                                    </option>
                                  );
                                })
                              : null}
                          </select>
                        </div>
                        {/* Под Спецификация */}
                        <div className="col-md mb-4 p-s-5">
                          <label className="form-label">Под спецификация</label>
                          <select
                            className="form-select filter-control f-select"
                            value={
                              form.sub_spec === ""
                                ? f_sub_spec
                                  ? f_sub_spec.length && "Укажите..."
                                  : form.sub_spec
                                : form.sub_spec
                            }
                            onChange={changeHandler}
                            id="sub_spec"
                            name="sub_spec"
                          >
                            <option value="Укажите..." disabled>
                              Укажите...
                            </option>
                            {f_sub_spec
                              ? f_sub_spec.map((elem) => {
                                  return (
                                    <option value={elem.id} key={elem.id}>
                                      {elem.name}{" "}
                                      {elem.description &&
                                        `(` + elem.description + `)`}
                                    </option>
                                  );
                                })
                              : null}
                          </select>
                        </div>
                        {/* Исполнитель */}
                        <div className="col-md mb-4 p-s-5">
                          <label className="form-label">Исполнитель</label>
                          <select
                            className="form-select filter-control f-select"
                            defaultValue="Укажите..."
                            onChange={changeHandler}
                            id="executor"
                            name="executor"
                          >
                            <option value="Укажите..." disabled>
                              Укажите...
                            </option>
                            {f_executor
                              ? f_executor.map((elem) => {
                                  return (
                                    <option value={elem.id} key={elem.id}>
                                      {elem.fio}
                                    </option>
                                  );
                                })
                              : null}
                          </select>
                        </div>
                        {/* Статус */}
                        <div className="col-md mb-4 p-s-5">
                          <label className="form-label">Статус</label>
                          <select
                            className="form-select filter-control f-select"
                            defaultValue="Укажите..."
                            onChange={changeHandler}
                            id="status"
                            name="status"
                          >
                            <option value="Укажите..." disabled>
                              Укажите...
                            </option>
                            {f_status
                              ? f_status.map((elem) => {
                                  return (
                                    <option value={elem.id} key={elem.id}>
                                      {elem.name}
                                    </option>
                                  );
                                })
                              : null}
                          </select>
                        </div>
                        <div className="col-md mb-4 p-s-5 datepicker-control">
                          <DatePicker
                            selected={form.date_start}
                            onChange={(date) =>
                              setForm({
                                ...form,
                                date_start: date,
                              })
                            }
                            selectsStart
                            startDate={form.date_start}
                            endDate={form.date_end}
                            locale={ru}
                            dateFormat="yyyy-MM-dd"
                            className="form-control filter-control"
                            id="start"
                          />
                          <DatePicker
                            selected={form.date_end}
                            onChange={(date) =>
                              setForm({
                                ...form,
                                date_end: date,
                              })
                            }
                            selectsEnd
                            startDate={form.date_start}
                            endDate={form.date_end}
                            locale={ru}
                            dateFormat="yyyy-MM-dd"
                            className="form-control filter-control"
                            id="end"
                          />
                        </div>
                        <div className="col-md col-xl-1 mb-4">
                          <label className="form-label d-none d-md-block">
                            &nbsp;
                          </label>
                          <div className="btn-group btn-group-sm">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-success filter_set"
                              onClick={getFilterOrders}
                            >
                              <FontAwesomeIcon icon={faFilter} />
                            </button>
                            <button
                              type="button"
                              onClick={clearForm}
                              className="btn btn-sm btn-outline-danger filter_clear"
                            >
                              <FontAwesomeIcon icon={faTimesCircle} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  <div className="order-table-section">
                    <div className="row">
                      <div className="col-sm-12 col-md-6">
                        <div className="table-length">
                          {orders
                            ? orders.length > 0 &&
                              `Количество заявок: ${orders.length}`
                            : null}
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-6">
                        <div className="table-search">
                          <label>
                            Поиск:
                            <input
                              type="search"
                              className="form-control form-control-sm"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="table-responsive">
                          <table className="table table-bordered align-middle">
                            <thead>
                              <tr>
                                <th scope="col">
                                  <center>№</center>
                                </th>
                                <th scope="col">
                                  <center>Приоритет</center>
                                </th>
                                <th scope="col">
                                  <center>Тема</center>
                                </th>
                                {!have_task && (
                                  <th scope="col">
                                    <center>Характер вопроса</center>
                                  </th>
                                )}
                                {have_task
                                  ? param === 2 && (
                                      <th scope="col">
                                        <center>Характер вопроса</center>
                                      </th>
                                    )
                                  : null}
                                <th scope="col">
                                  <center>Спецификация</center>
                                </th>
                                <th scope="col">
                                  <center>Под спецификация</center>
                                </th>
                                <th scope="col">
                                  <center>Автор</center>
                                </th>
                                <th scope="col">
                                  <center>Дата создания</center>
                                </th>
                                <th scope="col">
                                  <center>Текущий владелец</center>
                                </th>
                                <th scope="col">
                                  <center>Исполнитель</center>
                                </th>
                                <th scope="col">
                                  <center>Статус</center>
                                </th>
                              </tr>
                            </thead>
                            <DataTable orders={orders} param={param} />
                          </table>
                        </div>
                      </div>
                    </div>
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
