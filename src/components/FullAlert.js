import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export const FullAlert = ({ message, section, close }) => {
  return (
    <div
      className={`alert alert-${message.type} alert-dismissible fade show`}
      role="alert"
    >
      {!message.errors ? (
        message.type === "success" ? (
          <>
            <FontAwesomeIcon icon={faCheck} className="icons" />{" "}
            {message.message}
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faTimes} className="icons" />{" "}
            {message.message}
          </>
        )
      ) : (
        <div className="validation-errors-section">
          <span>Исправьте ошибки:</span>
          <ul>
            {message.errors.task ? <li>{message.errors.task}</li> : null}
            {message.errors.spec ? <li>{message.errors.spec}</li> : null}
            {message.errors.sub_spec ? (
              <li>{message.errors.sub_spec}</li>
            ) : null}
            {message.errors.subject ? <li>{message.errors.subject}</li> : null}
            {message.errors.description ? (
              <li>{message.errors.description}</li>
            ) : null}
          </ul>
        </div>
      )}
      {section ? (
        <button type="button" className="btn-close" onClick={close}></button>
      ) : null}
    </div>
  );
};
