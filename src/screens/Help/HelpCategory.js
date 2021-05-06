import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { CategoryBody } from "../../components/help/CategoryBody";
import { HeaderHelp } from "../../components/help/HeaderHelp";
import { Navbar } from "../../components/Navbar";

export const HelpCategory = () => {
  const location = useLocation();
  const { category, items } = location.state;
  const id_struct = useSelector((state) => state.auth.data.id_struct);
  const icons = require("@fortawesome/free-solid-svg-icons");
  return (
    <div className="layout-container">
      <Navbar />
      <div className="layout-content">
        <div className="help-section container-fluid flex-grow-1 container-p-y">
          <h4 className="font-weight-bold mb-4">
            <FontAwesomeIcon icon={icons["faGraduationCap"]} className="icon" />
            {category.name}
            <div className="text-muted text-tiny mt-1">
              <small className="font-weight-normal">Центр знаний</small>
            </div>
          </h4>
          <div className="row">
            {id_struct === 2 && <HeaderHelp />}
            <CategoryBody category={category} items={items} />
          </div>
        </div>
      </div>
    </div>
  );
};
