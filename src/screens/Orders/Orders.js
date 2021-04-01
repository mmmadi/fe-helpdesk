import React, { useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../redux/actions/orderActions";
import { DataTable } from "../../components/DataTable";

export const Orders = () => {
  const dispatch = useDispatch();
  const { userId, id_struct, have_task } = useSelector(
    (state) => state.auth.data
  );
  const orders = useSelector((state) => state.order.orders);

  const getDataOrders = (param) => {
    dispatch(getOrders(param, userId, id_struct));
  };

  useEffect(() => {
    dispatch(getOrders(1, userId, id_struct));
  }, [dispatch, userId, id_struct]);

  return (
    <div className="layout-container">
      <Navbar />
      <div className="layout-content">
        <div className="order-list-section container-fluid flex-grow-1 container-p-y">
          <h4 className="font-weight-bold mb-4">
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
                      <div className="form-row"></div>
                    </div>
                  ) : null}
                  <div className="order-table-section">
                    <div className="row">
                      <div className="col-sm-12 col-md-6">
                        <div className="table-length">
                          <label>
                            Показать
                            <select className="form-select">
                              <option value="10">10</option>
                              <option value="25">25</option>
                              <option value="50">50</option>
                              <option value="100">100</option>
                            </select>
                            записей
                          </label>
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
                              {orders
                                ? orders.length
                                  ? orders.param === 2 && (
                                      <th scope="col">
                                        <center>Характер вопроса</center>
                                      </th>
                                    )
                                  : null
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
                          <DataTable orders={orders} />
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
  );
};
