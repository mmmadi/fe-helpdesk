export const CancelOrder = ({
  openFileUpload,
  fileChangeHandler,
  changeHandler,
  cancelHandler,
  fileRemoveHandler,
  files,
}) => {
  return (
    <div className="card-body">
      <form className="form-horizontal">
        <div className="form-group row">
          <label
            htmlFor="comment"
            className="col-form-label col-sm-2 text-sm-right"
          >
            Замечание
          </label>
          <div className="col-sm-10">
            <div className="desc-editor">
              <textarea
                id="comment"
                name="comment"
                className="form-control"
                onChange={changeHandler}
                placeholder="Если нужно укажите дополнительную информацию"
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
                    accept=".png, .jpg, .jpeg"
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
          <div className="col-sm-8"></div>
          <div className="col-sm-4">
            <button
              className="btn btn-outline-success pull-right"
              onClick={cancelHandler}
            >
              Отменить
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
