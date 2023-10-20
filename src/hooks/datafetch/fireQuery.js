import { api } from "./api";
import { useQuery } from "@tanstack/react-query";
import { DEFAULT_QUERY,EMPTY_SELECT } from "../../utils/constants";

export const getFires = (params) => {
  return api.get("", { params: params });
};

export const useAllFiresQuery = ({ onSuccess, onError, queryParams }) => {
  return useQuery({
    queryKey: ["fires", queryParams],
    queryFn: () => getFires(queryParams),
    onSuccess: onSuccess,
    onError: onError,
  });
};

const queryParams = (str) => {
  return {
    onSuccess: () => {},
    onError: () => {},
    queryParams: {
      limit: 100,
      where: DEFAULT_QUERY,
      group_by: str,
    },
  };
};



export const getAllOptions = (propertyStr) => {
  const { data, isLoading } = useAllFiresQuery(queryParams(propertyStr));
  const optionsArr = data?.data.results.map((el) => {
    if (el[propertyStr]) {
      return { label: el[propertyStr], value: el[propertyStr] };
    } else {
      return EMPTY_SELECT;
    }
  });
  const selectedOptions = isLoading ? [] : optionsArr;
  return selectedOptions;
};
