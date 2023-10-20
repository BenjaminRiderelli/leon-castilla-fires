import TableComponent from "./tablecomponent";

const Table = ({ data }) => {
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
