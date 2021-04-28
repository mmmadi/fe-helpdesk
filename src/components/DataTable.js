import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Loader } from "../components/Loader";
import { StatusStyle } from "../components/const/StatusStyle";
import { PriorityStyle } from "../components/const/PriorityStyle";

export const DataTable = ({ orders, param }) => {
  const data = orders ? orders : [];
  const loading = useSelector((state) => state.app.loading);
  const { have_task } = useSelector((state) => state.auth.data);

  if (loading) {
    return (
      <tbody>
        <tr>
          <td colSpan="8">
            <Loader />
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {data.map((el) => {
        return (
          <tr key={el.id}>
            <th scope="row">
              <Link to={`/orders/${el.id}`}>Заявка № {el.id}</Link>
            </th>
            <td>
              <center>
                <PriorityStyle priority={el.priority} />
              </center>
            </td>
            <td>{el.subject}</td>
            {!have_task && <td>{el.task}</td>}
            {have_task ? param === 2 && <td>{el.task}</td> : null}
            <td>{el.spec}</td>
            <td>{el.sub_spec}</td>
            <td>{el.author}</td>
            <td>{el.date_ins}</td>
            <td>{el.owner}</td>
            <td>{el.executor}</td>
            <td>
              <center>
                <StatusStyle status={el.status} />
              </center>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};
