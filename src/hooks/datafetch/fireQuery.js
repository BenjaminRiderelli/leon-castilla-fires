import { api } from "./api";
import { useQuery } from "@tanstack/react-query";

export const getFires = (params) => {
  return api.get("",{ params: params });
};
  
  export const useAllFiresQuery = ({ onSuccess, onError, queryParams }) => {
    return useQuery({
      queryKey: ["fires", queryParams],
      queryFn: () => getFires(queryParams),
      onSuccess:onSuccess,
      onError: onError,
    });
  };

  