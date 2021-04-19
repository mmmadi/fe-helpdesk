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
              <center>
                <Link to={`/orders/${el.id}`}>Заявка № {el.id}</Link>
              </center>
            </th>
            <td>
              <center>
                <PriorityStyle priority={el.priority} />
              </center>
            </td>
            <td>
              <center>{el.subject}</center>
            </td>
            {!have_task && (
              <td>
                <center>{el.task}</center>
              </td>
            )}
            {have_task
              ? param === 2 && (
                  <td>
                    <center>{el.task}</center>
                  </td>
                )
              : null}
            <td>
              <center>{el.spec}</center>
            </td>
            <td>
              <center>{el.sub_spec}</center>
            </td>
            <td>
              <center>{el.author}</center>
            </td>
            <td>
              <center>{el.date_ins}</center>
            </td>
            <td>
              <center>{el.owner}</center>
            </td>
            <td>
              <center>{el.executor}</center>
            </td>
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
