import { useState } from "react";
import * as moment from "moment";
import "moment/locale/ru";
import { useDispatch, useSelector } from "react-redux";
import DefUser from "../../images/def-user.png";
import { server } from "../../config/config.json";
import { UnderComments } from "./UnderComments";
import { addUnderComment } from "../../redux/actions/orderActions";

export const Comments = ({ orderId, commentsData, underCommentsData }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(null);
  const [text, setText] = useState("");
  const [mark, setMark] = useState(null);

  const userId = useSelector((state) => state.auth.data.userId);

  const setAnswer = (id, userIns) => {
    setText("");
    setActive(id);
    setMark(userIns);
  };

  const cancelAnswer = () => {
    setText("");
    setActive(null);
  };

  const addUnderCommentHandler = (commentId) => {
    dispatch(addUnderComment(commentId, userId, text, orderId, mark));
    setText("");
    setActive(null);
  };

  return (
    <>
      {commentsData.map((comment) => {
        return (
          <div className="card mb-3" key={comment.id}>
            <div className="card-body comments">
              <div className="author-icon">
                <div className="position-relative">
                  {comment.img ? (
                    <img
                      src={`${server}/static/users/${comment.id_user_ins}/${comment.img}`}
                      alt="default user icon"
                      className="ui-w-45 rounded-circle mr-2"
                    />
                  ) : (
                    <img
                      src={DefUser}
                      alt="default user icon"
                      className="ui-w-45 rounded-circle mr-2"
                    />
                  )}
                </div>
              </div>
              <div className="comment-body">
                <div className="media">
                  <span className="mr-2">{comment.fio}</span>
                  <div className="text-muted small">
                    {moment(comment.date_ins_true).fromNow()}
                  </div>
                </div>
                <div className="mt-2 mb-2 comment-1">
                  <span>{comment.comment}</span>
                </div>
                <div className="files-group">
                  {comment.files.files.map((file, index) => {
                    return (
                      <div className="file-element" key={index}>
                        <span>
                          <a
                            href={`${server}/static/orders/${comment.order_id}/comments/${comment.id}/${file.hashname}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {file.name}
                          </a>
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="under-comments">
                  <button
                    className="text-muted"
                    onClick={() => setAnswer(comment.id, comment.id_user_ins)}
                  >
                    Ответить
                  </button>
                </div>
                {active === comment.id && (
                  <div className="under_comments mt-2">
                    <input
                      type="text"
                      className="form-control mr-2"
                      placeholder="Добавьте ответ"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                    <div className="d-flex justify-content-end mt-2">
                      <button
                        type="button"
                        className="btn btn-outline-secondary mr-2"
                        onClick={cancelAnswer}
                      >
                        Отмена
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => addUnderCommentHandler(comment.id)}
                      >
                        Ответить
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {underCommentsData && (
              <UnderComments
                orderId={orderId}
                commentId={comment.id}
                underCommentsData={underCommentsData.data.filter(
                  (x) => x.comment_id === comment.id
                )}
              />
            )}
          </div>
        );
      })}
    </>
  );
};
