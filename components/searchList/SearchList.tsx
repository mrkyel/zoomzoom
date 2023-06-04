import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { IProduct } from "./../../lib/interface";
import { BASE_URL } from "./../../lib/constants";
import Card from "../card";
import styles from "./SearchList.module.scss";
import { useAtom } from "jotai";
import { selectedFiltersAtom } from "./../../atoms/filter";
import { filters } from "./../../lib/filters";

const SearchList: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useAtom(selectedFiltersAtom);
  const { tourType, itinerary } = selectedFilters;
  const tourTypeLength = tourType.length;
  const itineraryLength = itinerary.length;

  const fetchProducts = async (): Promise<IProduct> => {
    const url = new URL(`${BASE_URL}`);
    url.searchParams.append("per_page", "20");
    url.searchParams.append("with", "country,seller");
    url.searchParams.append("only[seller]", "companyName,nickname");
    url.searchParams.append("category_id", "64");
    url.searchParams.append("page", "1");

    if (tourTypeLength > 0) {
      const tourTypeFilters = tourType.join(",");
      url.searchParams.append("filter[tourType]", tourTypeFilters);
    }

    if (itineraryLength > 0) {
      const itineraryFilters = itinerary.join(",");
      url.searchParams.append("filter[itinerary]", itineraryFilters);
    }

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  };

  const { data, isLoading, isError, error, refetch } = useQuery<
    IProduct,
    Error
  >(["products", selectedFilters], fetchProducts);

  useEffect(() => {
    refetch();
  }, [selectedFilters, refetch]);

  const handleRemoveFilter = (filter: string, filterType: string) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].filter(type => type !== filter),
    }));
  };

  const getFilterText = (filterKey: string, filterType: string) => {
    return filters[filterType].find(item => item.key === filterKey)?.text || "";
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.filterInfo}>
        <div className={styles.searchResult}>
          검색결과: {data.data.length}개 상품
        </div>
        <div className={styles["tag-container"]}>
          {tourTypeLength > 0 && (
            <span className={styles.filterTag}>
              {tourType.map(filter => (
                <button
                  key={filter}
                  className={styles.filterButton}
                  onClick={() => handleRemoveFilter(filter, "tourType")}
                >
                  {getFilterText(filter, "tourTypes")} X
                </button>
              ))}
            </span>
          )}
          {itineraryLength > 0 && (
            <span className={styles.filterTag}>
              {itinerary.map(filter => (
                <button
                  key={filter}
                  className={styles.filterButton}
                  onClick={() => handleRemoveFilter(filter, "itinerary")}
                >
                  {getFilterText(filter, "itinerary")} X
                </button>
              ))}
            </span>
          )}
        </div>
      </div>
      <div className={styles.cardContainer}>
        {data.data.map(product => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SearchList;
