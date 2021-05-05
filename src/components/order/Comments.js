import DefUser from "../../images/def-user.png";
import { server } from "../../config/config.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

export const Comments = ({ commentsData }) => {
  return (
    <>
      {commentsData.data.map((comment) => {
        return (
          <div className="card mb-3" key={comment.id}>
            <div className="card-body">
              <div className="media">
                <div className="position-relative">
                  {comment.img ? (
                    <img
                      src={`${server}/static/users/${comment.id_user_ins}/${comment.img}`}
                      alt="default user icon"
                      className="ui-w-40 rounded-circle"
                    />
                  ) : (
                    <img
                      src={DefUser}
                      alt="default user icon"
                      className="ui-w-40 rounded-circle"
                    />
                  )}
                </div>
                <div className="media-body ml-3">
                  <div className="float-right text-muted small">
                    <FontAwesomeIcon icon={faClock} className="icon" />
                    {comment.date_ins}
                  </div>
                  <span>{comment.fio}</span>
                </div>
              </div>
              <div className="mt-2 comment-1">
                <p></p>
                <p>{comment.comment}</p>
                <p></p>
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
            </div>
          </div>
        );
      })}
    </>
  );
};
