const Pagination = ({ setQuery, totalCount }) => {
  const { params, setParams } = setQuery;



  const paginate = (offset, number, totalCount) => {
    
    const res = offset + number;
    if (res >= totalCount) {
      console.log(totalCount - offset);
      return offset;
    } else if (res <= 0) {
      return 0;
    } else {
      return offset + number;
    }
  };

  const nextPage = () => {
    setParams((prevState) => {
      const { offset } = prevState;
      const newOffset = paginate(offset, 100, totalCount);
      return {
        ...prevState,
        offset: newOffset,
      };
    });
  };

  const prevPage = () => {
    setParams((prevState) => {
      const { offset } = prevState;
      const newOffset = paginate(offset, -100, totalCount);
      return {
        ...prevState,
        offset: newOffset,
      };
    });
  };

  return (
    <div className="flex flex-wrap md:flex-nowrap gap-4 w-full justify-around p-8 ">
      <button
        onClick={prevPage}
        className="border-2 rounded p-2 w-[40%] active:scale-95"
      >
        Previa
      </button>
      <h3 className="border-2 rounded p-2 text-s">
        {totalCount ? `${params.offset}/${totalCount}` : "....."}
      </h3>
      <button
        onClick={nextPage}
        className="border-2 rounded p-2 w-[40%] active:scale-95"
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
