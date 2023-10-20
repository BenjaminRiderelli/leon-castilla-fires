import { useState } from "react";
import { useAllFiresQuery } from "../../hooks/datafetch/fireQuery";
import { DEFAULT_QUERY } from "../../utils/constants";
import Filter from "./filter";

const exampleGeo =
  "in_bbox(posicion, 41.7632789990626, -3.4662480000000007, 42.7632789990626, -4.4662480000000007)";

const MainComponent = () => {

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

  const { data, error } = useAllFiresQuery(queryParams);

  return (
    <section>

      <Filter
      setQuery={{params, setParams}}
      />

      {JSON.stringify(data?.data.results)}
    </section>
  );
};

export default MainComponent
