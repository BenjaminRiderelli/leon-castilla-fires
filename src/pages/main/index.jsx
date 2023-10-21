import { useState } from "react";
import { useAllFiresQuery } from "../../hooks/datafetch/fireQuery";
import NotFound from "../../components/notfound";
import { DEFAULT_QUERY } from "../../utils/constants";
import Aside from "../../components/main/aside";
import Table from "../../components/main/table";
import Map from "../../components/main/map";
import { Route, Routes } from "react-router-dom";

const MainPage = () => {
  const [params, setParams] = useState({
    limit: 100,
    where: DEFAULT_QUERY,
    order_by: "fecha_del_parte DESC",
    offset:0
  });

  const onSuccess = (payload) => {
    console.log(payload);
  };

  const onError = (error) => {
    console.log(error);
  };

  const queryParams = {
    onSuccess: onSuccess,
    onError: onError,
    queryParams: { ...params },
  };

  const { data, error, isLoading } = useAllFiresQuery(queryParams);
  const results = data?.data.results;
  const locations =
    results?.map((fire) => fire.posicion).filter((location) => location) ?? [];
  const totalCount = data?.data.total_count;

  return (
    <section className="flex flex-col md:flex-row gap-8 md:gap-0 h-screen overflow-hidden">
      <Aside setQuery={{ params, setParams }} totalCount={totalCount} />
      <Routes>
        <Route
          exact
          path="/"
          element={<Table data={results} isLoading={isLoading} />}
        />
        <Route path="/map" element={<Map locations={locations} />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default MainPage;
