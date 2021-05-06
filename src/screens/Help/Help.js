import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HeaderHelp } from "../../components/help/HeaderHelp";
import { IconsBodyHelp } from "../../components/help/IconsBodyHelp";
import { Navbar } from "../../components/Navbar";
import {
  getHelpCategories,
  getHelpItems,
} from "../../redux/actions/helpActions";

export const Help = () => {
  const dispatch = useDispatch();

  const id_struct = useSelector((state) => state.auth.data.id_struct);
  const { categories, helpItems } = useSelector((state) => state.help);

  useEffect(() => {
    dispatch(getHelpCategories());
    dispatch(getHelpItems());
  }, [dispatch]);

  return (
    <div className="layout-container">
      <Navbar />
      <div className="layout-content">
        <div className="help-section container-fluid flex-grow-1 container-p-y">
          <h4 className="font-weight-bold mb-4">
            <FontAwesomeIcon icon={faGraduationCap} className="icon" />
            Центр знаний
            <div className="text-muted text-tiny mt-1">
              <small className="font-weight-normal">Список</small>
            </div>
          </h4>
          <div className="row">
            {id_struct === 2 && <HeaderHelp />}
            <IconsBodyHelp categories={categories} helpItems={helpItems} />
          </div>
        </div>
      </div>
    </div>
  );
};
