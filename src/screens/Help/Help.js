import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar } from "../../components/Navbar";

export const Help = () => {
  return (
    <div className="layout-container">
      <Navbar />
      <div className="layout-content">
        <div className="dashboard-section container-fluid flex-grow-1 container-p-y">
          <h4 className="font-weight-bold mb-4">
            <FontAwesomeIcon icon={faGraduationCap} className="icon" />
            Центр знаний
            <div className="text-muted text-tiny mt-1">
              <small className="font-weight-normal">Основная информация</small>
            </div>
          </h4>
        </div>
      </div>
    </div>
  );
};
