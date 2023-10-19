import { useEffect, useState } from "react";
import {
  LEON_DE_CASTILLA_PROVINCES,
  SITUACION_ACTUAL_ARRAY,
  CAUSA_PROBABLE_ARRAY,
} from "../../../utils/constants";
import { arrayToQueryString, arrayToWhereString } from "../../../utils/utils";
import { useAllFiresQuery } from "../../../hooks/datafetch/fireQuery";
import Select from "react-tailwindcss-select";

const Filter = ({ setQuery }) => {
  const { params, setParams } = setQuery;

  const [provinces, setProvinces] = useState(LEON_DE_CASTILLA_PROVINCES);
  const [geoLocalization, setGeoLocalization] = useState("");
  const [probableCause, setProbableCause] = useState("");
  const [currentSituation, setCurrentSituation] = useState("");
  const [maxLevelReached, setMaxLevelReached] = useState("");
  const [whereString, setWhereString] = useState();

  const onSuccess = (payload) => {
    console.log(payload);
  };

  const onError = (e) => {
    console.log(e);
  };


  const queryParamsProvince = {
    onSuccess: onSuccess,
    onError: onError,
    queryParams: {limit:100, group_by:"provincia" },
  };


  const {data:provincesArray} = useAllFiresQuery(queryParamsProvince)
  const provinceOptions = provincesArray?.data.results.map(prov=> prov.provincia)

  console.log(provinceOptions)

  useEffect(() => {
    const provinceString = arrayToQueryString(provinces, "provincia");

    const probableCauseString = probableCause
      ? `causa_probable like "${probableCause}"`
      : "";
    const currentSituationString = currentSituation
      ? `situacion_actual like "${currentSituation}"`
      : "";
    const maxLevelReachedStr = maxLevelReached
      ? `nivel_maximo_alcanzado=${maxLevelReached}`
      : "";
    setWhereString(
      arrayToWhereString([
        probableCauseString,
        currentSituationString,
        maxLevelReachedStr,
      ])
    );
  }, [provinces, probableCause, currentSituation, maxLevelReached]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <label>
        <p htmlFor="provinces">Provincia</p>
        {/* <Select 
        id="provinces"
        /> */}
      </label>
      <label>
        <p htmlFor="causa_probable">Causa probable</p>
        <input
          className="border-2 border-black"
          type="text"
          id="causa_probable"
          name="cause_probable"
          value={probableCause}
          onChange={(e) => {
            const { value, name } = e.target;
            if (value) {
              setProbableCause(value);
            } else {
              setProbableCause("");
            }
          }}
        />
      </label>
      <label>
        <p htmlFor="situacion_actual">Situacion Actual</p>
        <input
          className="border-2 border-black"
          type="text"
          id="situacion_actual"
          name="situacion_actual"
          value={currentSituation}
          onChange={(e) => {
            const { value, name } = e.target;
            if (value) {
              setCurrentSituation(value);
            } else {
              setCurrentSituation("");
            }
          }}
        />
      </label>
      <label>
        <p htmlFor="situacion_actual">Nivel Máximo alcanzado</p>
        <input
          className="border-2 border-black"
          type="text"
          id="nivel_maximo_alcanzado"
          name="nivel_maximo_alcanzado"
          value={maxLevelReached}
          onChange={(e) => {
            const { value, name } = e.target;
            if (value) {
              setMaxLevelReached(value);
            } else {
              setMaxLevelReached("");
            }
          }}
        />
      </label>

      <button
        onClick={(e) => {
          e.preventDefault();
          setParams({ ...params, where: whereString });
        }}
      >
        APPLY FILTER
      </button>
    </form>
  );
};

export default Filter;
