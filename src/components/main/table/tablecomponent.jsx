import { capitalizeSentence } from "../../../utils/utils";
import uuid from "react-uuid";
import TD from "./td";

const TableComponent = ({ data }) => {
  const headerKeys = data ? Object.keys(data[0]) : [];

  const headerElements = headerKeys.map((key) => {
    return (
      <th className="border-2 border-black min-w-[150px]" key={key}>
        {capitalizeSentence(key)}
      </th>
    );
  });

  const trElements = data
    ? data.map((row, i) => {
        const tdElements = headerKeys.map((key, h) => {
          const data = row[key];
          if (key === "provincia") {
            return <TD data={data.join(", ")} key={uuid()} />;
          }
          if (key === "posicion") {
            const info = data ? `${data.lat}, ${data.lon}`  : "";
            return <TD data={info} key={uuid()} />;
          }
          return <TD data={data} key={uuid()} />;
        });

        return <tr key={i}>{tdElements}</tr>;
      })
    : [];

  return (
    <table className="">
      <thead className="bg-white">
        <tr className="">{headerElements}</tr>
      </thead>
      <tbody>{trElements}</tbody>
    </table>
  );
};

export default TableComponent;
