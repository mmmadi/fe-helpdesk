import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AddComment = ({
  openFileUpload,
  fileChangeHandler,
  changeHandler,
  addCommentHandler,
  fileRemoveHandler,
  files,
}) => {
  return (
    <div className="card">
      <div className="card-body" style={{ padding: 0 }}>
        <form className="form-horizontal">
          <div className="form-group row">
            <div className="col-sm-12">
              <div className="desc-editor">
                <textarea
                  id="comment"
                  name="comment"
                  className="form-control"
                  onChange={changeHandler}
                  placeholder="Напишите текст..."
                  style={{ height: 100 }}
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
            <div className="col-sm-12">
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
                onClick={addCommentHandler}
              >
                <FontAwesomeIcon icon={faComment} className="icon" />
                Отправить
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
