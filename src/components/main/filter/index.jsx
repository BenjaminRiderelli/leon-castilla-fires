import { useEffect, useState } from "react";
import { DEFAULT_QUERY, EMPTY_SELECT } from "../../../utils/constants";
import { arrayToWhereString, calculateBoundingBox } from "../../../utils/utils";
import { getAllOptions } from "../../../hooks/datafetch/fireQuery";
import Select from "react-tailwindcss-select";
import { NavLink } from "react-router-dom";

const Filter = ({ setQuery }) => {
  //query params going in the request
  const { params, setParams } = setQuery;

  const [selectedProvince, setSelectedProvince] = useState();
  const [selectedProbableCause, setSelectedProbableCause] =
    useState();
  const [selectedCurrentSituation, setSelectedCurrentSituation] =
    useState();
  const [maxLevelReached, setMaxLevelReached] = useState("");
  const [textSearch, setTextSearch] = useState("");
  const [coordenates, setCoordenates] = useState("");

  //This is the string sent to the backend in the params.where field
  const [whereString, setWhereString] = useState();

  const provincesOption = [EMPTY_SELECT, ...getAllOptions("provincia")];
  const currentSituationOptions = getAllOptions("situacion_actual");
  const probableCauseOptions = getAllOptions("causa_probable");

  useEffect(() => {
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
      const numbersArray = coordenates
        .split(",")
        .map((str) => parseFloat(str.trim()));
      const [lat, lon] = numbersArray;
      const polygon = calculateBoundingBox(lat, lon, 10);
      const { minLat, minLon, maxLat, maxLon } = polygon;
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
    setSelectedCurrentSituation(EMPTY_SELECT);
    setSelectedProbableCause(EMPTY_SELECT);
    setSelectedProvince(EMPTY_SELECT);
    setParams({ ...params, where: DEFAULT_QUERY });
  };

  return (
    <aside className="flex flex-col md:min-w-[20%] md:max-w-[20%] gap-4 mmin-h-[100vh] bg-white overflow-auto">
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
            <p htmlFor="búsqueda_por_coordenadas">Incendios Cercanos - 10km</p>
            <p htmlFor="búsqueda_por_coordenadas" className="text-xs">
              introduzca coordenadas
            </p>
          </div>
          <input
            className="border-2  w-full max-w-full p-2"
            placeholder="41.52228899906353 , -5.968164"
            type="text"
            id="búsqueda_de_texto"
            name="búsqueda_de_texto"
            value={coordenates}
            onChange={(e) => handleChange(e, setCoordenates)}
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
            setParams({ ...params, where: whereString });
          }}
        >
          APLICAR FILTRO
        </button>
        <button
          type="button"
          className="border-2 rounded p-2 active:scale-95"
          onClick={clearFilter}
        >
          LIMPIAR FILTRO
        </button>
      </form>
      <nav>
        <ul className="flex w-full justify-around flex-wrap gap-12 xl:gap-0">
          <li className="active:scale-95">
            <NavLink
              end
              to="/map"
              className="p-4 px-12 border-2 border-black rounded"
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  textDecoration: isActive ? "underline" : "",
                };
              }}
            >
              Mapa
            </NavLink>
          </li>
          <li className="active:scale-95">
            <NavLink
              end
              to="/"
              className="p-4 px-12 border-2 border-black rounded"
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  textDecoration: isActive ? "underline" : "",
                };
              }}
            >
              Tabla
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Filter;
