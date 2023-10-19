import { useEffect, useState } from "react";
import { useAllFiresQuery } from "../../hooks/datafetch/fireQuery";
import { LEON_DE_CASTILLA_PROVINCES } from "../../utils/constants";
import { arrayToQueryString, arrayToWhereString } from "../../utils/utils";
import Filter from "./filter";

const exampleGeo =
  "in_bbox(posicion, 41.7632789990626, -3.4662480000000007, 42.7632789990626, -4.4662480000000007)";

const MainComponent = () => {

  const [params, setParams] = useState({
    limit: 100,
    where: "",
  });

  const onSuccess = (payload) => {
    console.log(payload);
  };

  const onError = (error) => {
    console.log(error);
  };

  const queryParams = {
    onSuccess: onSuccess,
    onError: (error) => {
      console.log(error);
    },
    queryParams: { ...params },
  };

  const { data, error } = useAllFiresQuery(queryParams);

  console.log(data?.data.results[0])

  return (
    <section>

      <Filter
      setQuery={{params, setParams}}
      />
    </section>
  );
};

export default MainComponent
