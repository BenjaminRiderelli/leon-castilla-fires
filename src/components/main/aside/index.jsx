import NavBar from "./navbar";
import Filter from "./filter";
import Pagination from "./pagination";

const Aside = ({ setQuery, totalCount }) => {
  return (
    <aside className="flex flex-col md:min-w-[320px] md:max-w-[20%] gap-4 min-h-[100vh] bg-white overflow-auto">
      <Filter setQuery={setQuery} />
      <NavBar />
      <Pagination setQuery={setQuery} totalCount={totalCount} />
    </aside>
  );
};

export default Aside;
