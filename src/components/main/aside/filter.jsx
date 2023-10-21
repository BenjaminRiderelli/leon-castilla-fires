import { useEffect, useState } from "react";
import { DEFAULT_QUERY } from "../../../utils/constants";
import { arrayToWhereString, getCoordenates } from "../../../utils/utils";
import { getAllOptions } from "../../../hooks/datafetch/fireQuery";
import Select from "react-tailwindcss-select";
import { NavLink } from "react-router-dom";
import {
  setStorageObject,
  getStorageObject,
} from "../../../utils/localStorageutils";

const Filter = ({ setQuery }) => {
  //Querys are made in ODSQL statements.

  //query params going in the request,
  //along with the query string its sending pagination and sorting params.
  const { params, setParams } = setQuery;
  //This is the string sent to the backend in the params.where field
  const [whereString, setWhereString] = useState();

  const filterConfig = getStorageObject("filterConfig");

  const [selectedProvince, setSelectedProvince] = useState(
    filterConfig?.selectedProvince
  );
  const [selectedProbableCause, setSelectedProbableCause] = useState(
    filterConfig?.selectedProbableCause
  );
  const [selectedCurrentSituation, setSelectedCurrentSituation] = useState(
    filterConfig?.selectedCurrentSituation
  );
  const [maxLevelReached, setMaxLevelReached] = useState(
    filterConfig?.maxLevelReached ?? ""
  );
  const [textSearch, setTextSearch] = useState(filterConfig?.textSearch ?? "");
  const [coordenates, setCoordenates] = useState(
    filterConfig?.coordenates ?? ""
  );
  const [nearByRange, setNearByRange] = useState(10);

  const provincesOption = getAllOptions("provincia");
  const currentSituationOptions = getAllOptions("situacion_actual");
  const probableCauseOptions = getAllOptions("causa_probable");

  useEffect(() => {
    //Needs more work on the string construction
    const provinceString = selectedProvince?.value
      ? `provincia like "${selectedProvince.value}"`
      : "";
    const probableCauseString = selectedProbableCause?.value
      ? `causa_probable like "${selectedProbableCause.value}"`
      : "";
    const currentSituationString = selectedCurrentSituation?.value
      ? `situacion_actual like "${selectedCurrentSituation.value}"`
      : "";
    const maxLevelReachedStr = maxLevelReached
      ? `nivel_maximo_alcanzado=${maxLevelReached}`
      : "";
    const textSearchString = textSearch
      ? `suggest(situacion_actual, provincia, causa_probable, "${textSearch}")`
      : "";
    let coordenatesString = "";
    if (coordenates) {
      const { minLat, minLon, maxLat, maxLon } = getCoordenates(coordenates, nearByRange);
      coordenatesString = `in_bbox(posicion, ${minLat} , ${minLon}, ${maxLat}, ${maxLon}) `;
    }
    setWhereString(
      arrayToWhereString([
        DEFAULT_QUERY,
        textSearchString,
        provinceString,
        probableCauseString,
        currentSituationString,
        maxLevelReachedStr,
        coordenatesString,
      ])
    );
  }, [
    coordenates,
    selectedProvince,
    selectedProbableCause,
    selectedCurrentSituation,
    maxLevelReached,
    nearByRange,
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

  const clearFilter = () => {
    setMaxLevelReached("");
    setTextSearch("");
    setSelectedCurrentSituation(null);
    setSelectedProbableCause(null);
    setSelectedProvince(null);
    setCoordenates("");
    setParams({ ...params, where: DEFAULT_QUERY, offset: 0 });
  };

  const saveFilter = () => {
    setStorageObject("filterConfig", {
      selectedProvince: selectedProvince,
      selectedCurrentSituation: selectedCurrentSituation,
      selectedProbableCause: selectedProbableCause,
      coordenates: coordenates,
      maxLevelReached: maxLevelReached,
      textSearch: textSearch,
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="flex flex-col p-4 gap-4 w-full"
    >
      <label>
        <p htmlFor="búsqueda_de_texto">Búsqueda de texto</p>
        <input
          placeholder="Situacion, provincia o causa"
          className="border-2  w-full max-w-full p-2"
          type="text"
          id="búsqueda_de_texto"
          name="búsqueda_de_texto"
          value={textSearch}
          onChange={(e) => handleChange(e, setTextSearch)}
        />
      </label>
      <label>
        <div className="flex items-baseline gap-4">
          <p htmlFor="coordenadas">Incendios Cercanos - {nearByRange}km</p>
          <p className="text-xs">
            introduzca coordenadas
          </p>
        </div>
        <input
          className="border-2  w-full max-w-full p-2"
          placeholder="41.52228899906353 , -5.968164"
          type="text"
          id="coordenadas"
          name="coordenadas"
          value={coordenates}
          onChange={(e) => handleChange(e, setCoordenates)}
        />
      </label>
      <label>
        <div className="flex items-baseline gap-4">
          <p htmlFor="búsqueda_por_coordenadas">introduzca rango</p>
        </div>
        <input
          className="border-2  w-full max-w-full p-2"
          placeholder="41.52228899906353 , -5.968164"
          type="range"
          id="búsqueda_de_texto"
          name="búsqueda_de_texto"
          value={nearByRange}
          min={10}
          max={50}
          onChange={(e) => setNearByRange(e.target.value)}
        />
      </label>
      <label className="">
        <p htmlFor="nivel_maximo_alcanzado">Nivel Máximo alcanzado</p>
        <input
          placeholder="0"
          className="border-2  w-full max-w-full p-2"
          type="number"
          id="nivel_maximo_alcanzado"
          name="nivel_maximo_alcanzado"
          value={maxLevelReached}
          onChange={(e) => handleChange(e, setMaxLevelReached)}
        />
      </label>
      <label>
        <p htmlFor="provincia">Provincia</p>
        <Select
          isClearable
          placeholder="Seleccionar..."
          isSearchable={true}
          className="max-w-full"
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
          isClearable
          placeholder="Seleccionar..."
          id="causa_probable"
          isSearchable={true}
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
          isClearable
          id="situacion_actual"
          placeholder="Seleccionar..."
          isSearchable={true}
          options={currentSituationOptions}
          name="situacion_actual"
          value={selectedCurrentSituation}
          onChange={(e) => {
            setSelectedCurrentSituation(e);
          }}
        />
      </label>

      <button
        className="border-2 rounded p-2 active:scale-95"
        onClick={(e) => {
          e.preventDefault();
          console.log(whereString);
          setParams({ ...params, where: whereString, offset: 0 });
        }}
      >
        BUSCAR
      </button>
      <button
        type="button"
        className="border-2 rounded p-2 active:scale-95"
        onClick={clearFilter}
      >
        LIMPIAR FILTRO
      </button>
      <button
        type="button"
        className="border-2 rounded p-2 active:scale-95"
        onClick={saveFilter}
      >
        SALVAR FILTRO
      </button>
    </form>
  );
};
export default Filter;
