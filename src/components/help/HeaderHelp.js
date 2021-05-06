import { faPlus, faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const HeaderHelp = () => {
  return (
    <div className="col-sm-12 p-2 mb-0">
      <div className="btn-group btn-group-sm pull-right">
        <Link to="/help/add/item" className="btn btn-sm btn-outline-success">
          <FontAwesomeIcon icon={faPlus} className="icon" />
          Добавить материал
        </Link>
        <Link to="/help/edit/category" className="btn btn-sm btn-outline-info">
          <FontAwesomeIcon icon={faCog} className="icon" />
          Редактор категорий
        </Link>
      </div>
    </div>
  );
};
