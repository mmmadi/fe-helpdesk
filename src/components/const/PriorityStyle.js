import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

export const PriorityStyle = ({ priority }) => {
  if (priority === "Высокий") {
    return (
      <span className="badge badge-outline-danger">
        <FontAwesomeIcon icon={faArrowUp} className="icon" />
        Высокий приоритет
      </span>
    );
  }

  if (priority === "Средний") {
    return (
      <span className="badge badge-outline-info">
        <FontAwesomeIcon icon={faMinus} className="icon" />
        Средний приоритет
      </span>
    );
  }
  if (priority === "Низкий") {
    return (
      <span className="badge badge-outline-primary">
        <FontAwesomeIcon icon={faArrowDown} className="icon" />
        Низкий приоритет
      </span>
    );
  }

  return null;
};
