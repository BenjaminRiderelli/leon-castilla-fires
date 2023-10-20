import { useEffect, useState } from "react";
import { DEFAULT_QUERY, EMPTY_SELECT } from "../../../utils/constants";
import { arrayToQueryString, arrayToWhereString } from "../../../utils/utils";
import {
  getAllOptions,
  useAllFiresQuery,
} from "../../../hooks/datafetch/fireQuery";
import Select from "react-tailwindcss-select";

const Filter = ({ setQuery }) => {
  //query params going in the request
  const { params, setParams } = setQuery;

  const [selectedProvince, setSelectedProvince] = useState(EMPTY_SELECT);
  const [selectedProbableCause, setSelectedProbableCause] =
    useState(EMPTY_SELECT);
  const [selectedCurrentSituation, setSelectedCurrentSituation] =
    useState(EMPTY_SELECT);
  const [maxLevelReached, setMaxLevelReached] = useState("");
  const [textSearch, setTextSearch] = useState("");

  //This is the actual string sent to the backend in the params.where field
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
    const textSearchString = textSearch
      ? `suggest(situacion_actual, provincia, causa_probable, "${textSearch}")`
      : "";

    setWhereString(
      arrayToWhereString([
        DEFAULT_QUERY,
        textSearchString,
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
    textSearch,
  ]);

  const handleChange = (e, setState) => {
    const { value, name } = e.target;
    if (value) {
      setState(value);
    } else {
      setState("");
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <label>
        <p htmlFor="búsqueda_de_texto">Búsqueda de texto</p>
        <input
          className="border-2 border-black"
          type="text"
          id="búsqueda_de_texto"
          name="búsqueda_de_texto"
          value={textSearch}
          onChange={(e) => handleChange(e, setTextSearch)}
        />
      </label>
      <label>
        <p htmlFor="provincia">Provincia</p>
        <Select
          id="provincia"
          options={provincesOption}
          name="provincia"
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
          type="number"
          id="nivel_maximo_alcanzado"
          name="nivel_maximo_alcanzado"
          value={maxLevelReached}
          onChange={(e) => handleChange(e, setMaxLevelReached)}
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
