import DefUser from "../../images/def-user.png";

export const Comments = ({ commentsData }) => {
  return (
    <>
      {commentsData.map((comment) => {
        return (
          <div className="card mb-3" key={comment.id}>
            <div className="card-body">
              <div className="media">
                <div className="position-relative">
                  <img
                    src={DefUser}
                    alt="default user icon"
                    className="ui-w-40 rounded-circle"
                  />
                </div>
                <div className="media-body ml-3">
                  <div className="float-right text-muted small">
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
                          href={`http://localhost:5000/static/orders/${comment.order_id}/comments/${comment.id}/${file}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {file}
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
