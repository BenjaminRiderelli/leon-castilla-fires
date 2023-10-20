import { useState } from "react";
import { useAllFiresQuery } from "../../hooks/datafetch/fireQuery";
import NotFound from "../../components/notfound";
import { DEFAULT_QUERY } from "../../utils/constants";
import Filter from "../../components/main/filter";
import Table from "../../components/main/table";
import Spinner from "../../components/spinner/spinner";
import Map from "../../components/main/map";
import { Route, Routes } from "react-router-dom";

const exampleGeo =
  "in_bbox(posicion, 41.7632789990626, -3.4662480000000007, 42.7632789990626, -4.4662480000000007)";

const MainPage = () => {
  const [params, setParams] = useState({
    limit: 100,
    where: DEFAULT_QUERY,
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

  return (
    <section className="flex flex-col md:flex-row gap-8 md:gap-0 h-screen overflow-hidden">
      <Filter setQuery={{ params, setParams }} />
      <Routes>
        <Route exact path="/" element={<Table data={results} />} />
        <Route path="/map" element={<Map locations={locations} />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default MainPage;
