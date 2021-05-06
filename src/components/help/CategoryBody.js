import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const CategoryBody = ({ category, items }) => {
  const icons = require("@fortawesome/free-solid-svg-icons");
  return (
    <div className="col-sm-12">
      <hr className="container-m-nx border-light my-0" />
      <div className="card mt-5">
        <h5
          className="card-header py-4 px-5"
          style={{ backgroundColor: "#fff" }}
        >
          <FontAwesomeIcon icon={icons[category.icon]} className="icon" />
          {category.name}
        </h5>
        <div className="row no-gutters row-bordered">
          {items.length > 0 ? (
            <div className="col-md-6 p-5">
              {items.map((x) => (
                <Link
                  to={{
                    pathname: `/help-item/${x.id}`,
                    state: { item: x },
                  }}
                  className="d-block mb-3"
                  key={x.id}
                >
                  <FontAwesomeIcon
                    icon={icons["faChevronRight"]}
                    className="icon"
                  />
                  {x.name}
                </Link>
              ))}
            </div>
          ) : (
            <div className="col-sm-12 p-4">
              <div className="alert alert-secondary fade show">
                В данной категории нет материалов
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
