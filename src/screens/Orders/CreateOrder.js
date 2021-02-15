import { Navbar } from "../../components/Navbar";

export const CreateOrder = () => {
  return (
    <div className="layout-container">
      <Navbar />
      <div className="layout-content">
        <div className="create-order-section container-fluid flex-grow-1 container-p-y">
          <h4 className="font-weight-bold mb-4">
            <i className="fa fa-tag"></i> Создание новой заявки
            <div className="text-muted text-tiny mt-1">
              <small className="font-weight-normal">Основная информация</small>
            </div>
          </h4>
          <form>
            <div className="row">
              <div className="col-md-12">
                <div className="card mb-4" style={{ border: "none" }}>
                  <div className="card-body">
                    <div className="form-group row">
                      <label
                        htmlFor="userReceiver"
                        className="col-form-label col-sm-2 text-sm-right"
                      >
                        Кому *
                      </label>
                      <div className="col-sm-10">
                        <select
                          className="form-select"
                          defaultValue="Укажите..."
                          id="userReceiver"
                        >
                          <option value="Укажите..." disabled>
                            Укажите...
                          </option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
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
