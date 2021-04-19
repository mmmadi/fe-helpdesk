import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faClock,
  faFlag,
  faTachometerAlt,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import { Navbar } from "../../components/Navbar";
import { getDashboardData } from "../../redux/actions/orderDashboardActions";

export const Dashboard = () => {
  const { userId, id_struct, have_task } = useSelector(
    (state) => state.auth.data
  );
  const dispatch = useDispatch();

  const dashboardData = useSelector((state) => state.dashboard.dashboardData);

  useEffect(() => {
    dispatch(getDashboardData(have_task, userId, id_struct));
  }, [dispatch, have_task, userId, id_struct]);

  return (
    <div className="layout-container">
      <Navbar />
      <div className="layout-content">
        <div className="dashboard-section container-fluid flex-grow-1 container-p-y">
          <h4 className="font-weight-bold mb-4">
            <FontAwesomeIcon icon={faTachometerAlt} className="icon" />
            Панель приборов
            <div className="text-muted text-tiny mt-1">
              <small className="font-weight-normal">Основная информация</small>
            </div>
          </h4>
          {have_task ? (
            <div className="row">
              <div className="col-sm-6 col-xl-3">
                <div className="card bg-danger border-0 text-white mb-4">
                  <div className="card-body d-flex">
                    <div>
                      <div className="text-xlarge">
                        {dashboardData ? dashboardData.inboxOrders[0].count : 0}
                      </div>
                      <div className="small opacity-75">
                        Входящие заявки в группе
                      </div>
                    </div>
                    <FontAwesomeIcon
                      icon={faClock}
                      className="text-xlarge opacity-25"
                    />
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-3">
                <div className="card bg-warning border-0 text-black mb-4">
                  <div className="card-body d-flex">
                    <div>
                      <div className="text-xlarge">
                        {dashboardData ? dashboardData.iAmExecutor[0].count : 0}
                      </div>
                      <div className="small opacity-75">
                        Я исполнитель в заявках
                      </div>
                    </div>
                    <FontAwesomeIcon
                      icon={faFlag}
                      className="text-xlarge opacity-25"
                    />
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-3">
                <div className="card bg-primary border-0 text-white mb-4">
                  <div className="card-body d-flex">
                    <div>
                      <div className="text-xlarge">
                        {dashboardData
                          ? dashboardData.outboxOrders[0].count
                          : 0}
                      </div>
                      <div className="small opacity-75">
                        Мои исходящие заявки
                      </div>
                    </div>
                    <FontAwesomeIcon
                      icon={faTags}
                      className="text-xlarge opacity-25"
                    />
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-3">
                <div className="card bg-info border-0 text-black mb-4">
                  <div className="card-body d-flex">
                    <div>
                      <div className="text-xlarge">
                        {dashboardData ? dashboardData.doneOrders[0].count : 0}
                      </div>
                      <div className="small opacity-75">Выполненных заявок</div>
                    </div>
                    <FontAwesomeIcon
                      icon={faCheckSquare}
                      className="text-xlarge opacity-25"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-sm-6 col-xl-3">
                <div className="card bg-primary border-0 text-white mb-4">
                  <div className="card-body d-flex">
                    <div>
                      <div className="text-xlarge">
                        {dashboardData
                          ? dashboardData.outboxOrders[0].count
                          : 0}
                      </div>
                      <div className="small opacity-75">
                        Мои исходящие заявки
                      </div>
                    </div>
                    <FontAwesomeIcon
                      icon={faTags}
                      className="text-xlarge opacity-25"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
