import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { AddComment } from "./AddComment";
import { addComment, getComments } from "../../redux/actions/orderActions";
import { Comments } from "./Comments";

export const OrderComment = () => {
  const orderId = useParams().id;
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth.data);
  const [files, setFiles] = useState([]);
  const [form, setForm] = useState({
    comment: null,
    userId,
  });

  const commentsData = useSelector((state) => state.order.comment);
  const newCommentsData = useSelector((state) => state.order.addedComment);

  useEffect(() => {
    dispatch(getComments(orderId));
  }, [dispatch, orderId]);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

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

  const clearForm = () => {
    document.querySelector("#comment").value = "";
    setForm({
      comment: null,
      userId: userId,
    });

    setFiles([]);
  };

  const addCommentHandler = (event) => {
    event.preventDefault();
    dispatch(addComment(orderId, form, files));
    clearForm();
  };

  if (newCommentsData) {
    if (newCommentsData.data.length) {
      return (
        <div className="row">
          <div className="content-chat">
            <Comments commentsData={newCommentsData.data} />
            <div className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <AddComment
                    openFileUpload={openFileUpload}
                    fileChangeHandler={fileChangeHandler}
                    changeHandler={changeHandler}
                    addCommentHandler={addCommentHandler}
                    fileRemoveHandler={fileRemoveHandler}
                    files={files}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  if (commentsData) {
    if (commentsData.data.length) {
      return (
        <div className="row">
          <div className="content-chat">
            <Comments commentsData={commentsData} />
            <div className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <AddComment
                    openFileUpload={openFileUpload}
                    fileChangeHandler={fileChangeHandler}
                    changeHandler={changeHandler}
                    addCommentHandler={addCommentHandler}
                    fileRemoveHandler={fileRemoveHandler}
                    files={files}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (commentsData.type === "danger") {
      return (
        <>
          <div className="card mb-1">
            <div className="card-body">
              <div className="row">
                <div className="content-chat no-comment">
                  <div className="alert alert-secondary fade show">
                    <h5>
                      <FontAwesomeIcon icon={faInfo} /> Ошибка загрузки данных.
                      Обратитесь к администратору!
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  }
  return (
    <>
      <div className="card mb-1">
        <div className="card-body">
          <div className="row">
            <div className="content-chat no-comment">
              <div className="alert alert-secondary fade show">
                <h5>
                  <FontAwesomeIcon icon={faInfo} /> Пока нет комментариев
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card mb-1">
        <div className="card-body">
          <div className="row">
            <AddComment
              openFileUpload={openFileUpload}
              fileChangeHandler={fileChangeHandler}
              changeHandler={changeHandler}
              addCommentHandler={addCommentHandler}
              fileRemoveHandler={fileRemoveHandler}
              files={files}
            />
          </div>
        </div>
      </div>
    </>
  );
};
