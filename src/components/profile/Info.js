export const Info = () => {
  return (
    <div
      className="tab-pane fade"
      id="account-info"
      role="tabpanel"
      aria-labelledby="account-info-tab"
    >
      <div className="card-body">
        <div className="row">
          <div className="form-check form-switch media align-items-center">
            <input
              className="form-check-input"
              type="checkbox"
              id="theme"
              onChange={(event) => console.log(event.target.checked)}
            />
            <label className="form-check-label" htmlFor="theme">
              Смена темы
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
