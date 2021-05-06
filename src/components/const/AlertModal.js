export const AlertModal = ({ id, body, ok, elId = null }) => {
  return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">{body}</div>
          <div className="modal-footer">
            <button
              id="cancel-button"
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Отмена
            </button>
            {elId ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => ok(elId)}
              >
                ОК
              </button>
            ) : (
              <button type="button" className="btn btn-primary" onClick={ok}>
                ОК
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
