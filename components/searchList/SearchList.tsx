import React from "react";
import { useQuery } from "@tanstack/react-query";
import { IProduct } from "./../../lib/interface";
import { BASE_URL } from "./../../lib/constants";

const SearchList: React.FC = () => {
  const fetchProducts = async (): Promise<[IProduct]> => {
    const response = await fetch(
      `${BASE_URL}?per_page=20&with=country%2Cseller&only%5Bseller%5D=companyName%2Cnickname&category_id=64&page=1`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  };

  const { data, isLoading, isError } = useQuery(["products"], fetchProducts, {
    staleTime: Infinity,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {(isError as any).message}</div>;
  }

  return <div>데이터 fetch 완료</div>;
};

export default SearchList;
