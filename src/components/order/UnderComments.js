import { useEffect, useState } from "react";
import * as moment from "moment";
import "moment/locale/ru";
import { useDispatch, useSelector } from "react-redux";
import DefUser from "../../images/def-user.png";
import { server } from "../../config/config.json";
import { addUnderComment } from "../../redux/actions/orderActions";

export const UnderComments = ({ orderId, commentId, underCommentsData }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(null);
  const [mark, setMark] = useState({});

  const userId = useSelector((state) => state.auth.data.userId);

  const setAnswer = (id, username, userIns) => {
    setActive(id);
    setMark({
      id: userIns,
      username,
    });
  };

  const cancelAnswer = () => {
    setActive(null);
  };

  useEffect(() => {
    if (active && mark) {
      const textDom = document.querySelector(`[data-id="${active}"]`);
      const contented = document.getElementById(`input-${active}`);
      const markValue = `<span class="badge bg-primary" style="margin-right: .5rem">@${mark.username}</span>`;
      textDom.insertAdjacentHTML("afterbegin", markValue);
      contented.focus();
    }
  }, [active, mark]);

  const addUnderCommentHandler = () => {
    if (active && mark) {
      const contented = document.getElementById(`input-${active}`);
      if (contented.childNodes.length === 0) {
        return console.log("input is empty");
      }
      dispatch(
        addUnderComment(
          commentId,
          userId,
          contented.textContent,
          orderId,
          mark.id
        )
      );
      setActive(null);
    }
  };

  return underCommentsData.map((comment) => (
    <div className="replies card-body" key={comment.id}>
      <div className="comments">
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
              {moment(comment.date_ins).fromNow()}
            </div>
          </div>
          <div className="mt-2 comment-1">
            {comment.marked ? (
              <>
                <span className="marked-username">@{comment.marked}</span>
                <span>{comment.text}</span>
              </>
            ) : (
              <span>{comment.text}</span>
            )}
          </div>
          <div className="under-comments">
            <button
              className="text-muted"
              onClick={() =>
                setAnswer(comment.id, comment.username, comment.id_user_ins)
              }
            >
              Ответить
            </button>
          </div>
          {active === comment.id && (
            <div className="under_comments mt-2">
              <div
                data-id={comment.id}
                className="select-input form-control d-flex justify-content-start"
                style={{ height: 35 }}
              >
                <div
                  id={`input-${comment.id}`}
                  className="text-value"
                  contentEditable
                  suppressContentEditableWarning
                ></div>
              </div>
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
                  onClick={addUnderCommentHandler}
                >
                  Ответить
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  ));
};
