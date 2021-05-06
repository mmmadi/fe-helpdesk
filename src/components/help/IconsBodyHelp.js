import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const IconsBodyHelp = ({ categories, helpItems }) => {
  const icons = require("@fortawesome/free-solid-svg-icons");

  if (!categories) {
    return (
      <>
        <div className="col-sm-12">
          <hr className="container-m-nx border-light my-0" />
          <div className="row row-bordered my-4">Загрузка...</div>
          <hr className="container-m-nx border-light my-0" />
        </div>
      </>
    );
  }

  if (!helpItems) {
    return (
      <>
        <div className="col-sm-12">
          <hr className="container-m-nx border-light my-0" />
          <div className="row row-bordered my-4">Загрузка...</div>
          <hr className="container-m-nx border-light my-0" />
        </div>
      </>
    );
  }

  return (
    <div className="col-sm-12">
      <hr className="container-m-nx border-light my-0" />
      <div className="row row-bordered my-4">
        {categories.data.map((x) => (
          <div className="col-6 col-sm-4 col-md-3 col-lg-4 col-xl-3" key={x.id}>
            <Link
              to={{
                pathname: `/help/cat/${x.id}`,
                state: {
                  category: x,
                  items: helpItems.data.filter(
                    (s) => s.help_category_id === x.id
                  ),
                },
              }}
              className="card card-hover text-body my-2"
            >
              <div className="card-body text-center py-5">
                <div className="display-3 text-primary">
                  <FontAwesomeIcon icon={icons[x.icon]} />
                </div>
                <h5 className="m-0 mt-3">{x.name}</h5>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <hr className="container-m-nx border-light my-0" />
      {categories.data.map((x) => (
        <div className="card mt-5" key={x.id}>
          <h5
            className="card-header py-4 px-5"
            style={{ backgroundColor: "#fff" }}
          >
            <FontAwesomeIcon icon={icons[x.icon]} className="icon" />
            {x.name}
          </h5>
          <div className="row no-gutters row-bordered">
            {helpItems.data.findIndex(
              (item) => item.help_category_id === x.id
            ) >= 0 ? (
              <div className="col-md-6 p-5">
                {helpItems.data
                  .filter((item) => item.help_category_id === x.id)
                  .map((s) => (
                    <Link
                      to={{
                        pathname: `/help-item/${s.id}`,
                        state: { item: s },
                      }}
                      className="d-block mb-3"
                      key={s.id}
                    >
                      <FontAwesomeIcon
                        icon={icons["faChevronRight"]}
                        className="icon"
                      />
                      {s.name}
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
      ))}
    </div>
  );
};
