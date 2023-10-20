import { useEffect, useState } from "react";
import { DEFAULT_QUERY, EMPTY_SELECT } from "../../../utils/constants";
import { arrayToQueryString, arrayToWhereString } from "../../../utils/utils";
import {
  getAllOptions,
  useAllFiresQuery,
} from "../../../hooks/datafetch/fireQuery";
import Select from "react-tailwindcss-select";

const Filter = ({ setQuery }) => {
  //params is the final query params going in the request
  const { params, setParams } = setQuery;

  const [selectedProvince, setSelectedProvince] = useState(EMPTY_SELECT);
  const [selectedProbableCause, setSelectedProbableCause] =
    useState(EMPTY_SELECT);
  const [selectedCurrentSituation, setSelectedCurrentSituation] =
    useState(EMPTY_SELECT);

  const [maxLevelReached, setMaxLevelReached] = useState("");
  const [whereString, setWhereString] = useState();

  const provincesOption = [EMPTY_SELECT, ...getAllOptions("provincia")];
  const currentSituationOptions = getAllOptions("situacion_actual");
  const probableCauseOptions = getAllOptions("causa_probable");

  useEffect(() => {
    const provinceString = selectedProvince.value
      ? `provincia like "${selectedProvince.value}"`
      : "";

    const probableCauseString = selectedProbableCause.value
      ? `causa_probable like "${selectedProbableCause.value}"`
      : "";
    const currentSituationString = selectedCurrentSituation.value
      ? `situacion_actual like "${selectedCurrentSituation.value}"`
      : "";
    const maxLevelReachedStr = maxLevelReached
      ? `nivel_maximo_alcanzado=${maxLevelReached}`
      : "";

    setWhereString(
      arrayToWhereString([
        DEFAULT_QUERY,
        provinceString,
        probableCauseString,
        currentSituationString,
        maxLevelReachedStr,
      ])
    );
  }, [
    selectedProvince,
    selectedProbableCause,
    selectedCurrentSituation,
    maxLevelReached,
  ]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <label>
        <p htmlFor="provinces">Provincia</p>
        <Select
          options={provincesOption}
          name="causa_probable"
          value={selectedProvince}
          onChange={(e) => {
            setSelectedProvince(e);
          }}
        />
      </label>
      <label>
        <p htmlFor="causa_probable">Causa probable</p>
        <Select
          options={probableCauseOptions}
          name="causa_probable"
          value={selectedProbableCause}
          onChange={(e) => {
            setSelectedProbableCause(e);
          }}
        />
      </label>
      <label>
        <p htmlFor="situacion_actual">Situacion Actual</p>
        <Select
          options={currentSituationOptions}
          name="situacion_actual"
          value={selectedCurrentSituation}
          onChange={(e) => {
            setSelectedCurrentSituation(e);
          }}
        />
      </label>
      <label>
        <p htmlFor="nivel_maximo_alcanzado">Nivel Máximo alcanzado</p>
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
          console.log(whereString);
          setParams({ ...params, where: whereString });
        }}
      >
        APPLY FILTER
      </button>
    </form>
  );
};

export default Filter;
