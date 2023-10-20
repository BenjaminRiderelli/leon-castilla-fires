import TableComponent from "./tablecomponent";
import Spinner from "../../spinner/spinner";
const Table = ({ data, isLoading }) => {



  if (isLoading) {
    return (
      <section className="flex justify-center items-center overflow-scroll w-full h-screen border-2">
        <Spinner/>
      </section>
    );
  }

  if (!data?.length) {
    return (
      <section className="flex justify-center items-center overflow-scroll w-full h-screen border-2">
        <p className="text-3xl">No hay resultados para esta busqueda</p>
      </section>
    );
  }

  return (
    <section className="overflow-scroll h-full border-2">
      <TableComponent data={data} />
    </section>
  );
};

export default Table;
