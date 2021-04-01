import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGavel } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export const StatusStyle = ({ status }) => {
  if (status === "Ожидания действия") {
    return (
      <span className="badge badge-primary">
        <FontAwesomeIcon icon={faClock} className="icon" />
        Ожидания действия
      </span>
    );
  }

  if (status === "На исполнении") {
    return (
      <span className="badge badge-warning">
        <FontAwesomeIcon icon={faGavel} className="icon" />
        На исполнении
      </span>
    );
  }
  if (status === "Исполнена") {
    return (
      <span className="badge badge-success">
        <FontAwesomeIcon icon={faCheckCircle} className="icon" />
        Исполнена
      </span>
    );
  }
  if (status === "Отклонена") {
    return (
      <span className="badge badge-danger">
        <FontAwesomeIcon icon={faTimes} className="icon" />
        Отклонена
      </span>
    );
  }
  return null;
};
