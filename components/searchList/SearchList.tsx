import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { IProduct } from "./../../lib/interface";
import { BASE_URL } from "./../../lib/constants";
import Card from "../card";
import styles from "./SearchList.module.scss";
import { useAtom } from "jotai";
import { selectedFiltersAtom } from "./../../atoms/filter";
import { filters } from "./../../lib/filters";
import { heartCountAtom } from "./../../atoms/like";

const SearchList: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useAtom(selectedFiltersAtom);
  const [heartCount, setHeartCount] = useAtom(heartCountAtom);

  const fetchProducts = async (): Promise<IProduct> => {
    const url = new URL(`${BASE_URL}`);

    url.searchParams.append("per_page", "20");
    url.searchParams.append("with", "country,seller");
    url.searchParams.append("only[seller]", "companyName,nickname");
    url.searchParams.append("category_id", "64");
    url.searchParams.append("page", "1");

    if (selectedFilters.tourType.length > 0) {
      const tourTypeFilters = selectedFilters.tourType.join(",");
      url.searchParams.append("filter[tourType]", tourTypeFilters);
    }

    if (selectedFilters.itinerary.length > 0) {
      const itineraryFilters = selectedFilters.itinerary.join(",");
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
    setHeartCount(0);
  }, [selectedFilters, refetch, setHeartCount]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const handleRemoveTourTypeFilter = (filter: string) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      tourType: prevFilters.tourType.filter(type => type !== filter),
    }));
  };

  const handleRemoveItineraryFilter = (filter: string) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      itinerary: prevFilters.itinerary.filter(type => type !== filter),
    }));
  };

  const getFilterText = (filterKey: string, filterType: string) => {
    const filterList = filters[filterType];
    const filter = filterList.find(item => item.key === filterKey);
    return filter ? filter.text : "";
  };

  return (
    <div className={styles.container}>
      <div className={styles.filterInfo}>
        <div className={styles.searchResult}>
          검색결과 : {data.data.length}개 상품
        </div>
        <div className={styles["tag-container"]}>
          {selectedFilters.tourType.length > 0 && (
            <span className={styles.filterTag}>
              {selectedFilters.tourType.map(filter => (
                <button
                  key={filter}
                  className={styles.filterButton}
                  onClick={() => handleRemoveTourTypeFilter(filter)}
                >
                  {getFilterText(filter, "tourTypes")} X
                </button>
              ))}
            </span>
          )}
          {selectedFilters.itinerary.length > 0 && (
            <span className={styles.filterTag}>
              {selectedFilters.itinerary.map(filter => (
                <button
                  key={filter}
                  className={styles.filterButton}
                  onClick={() => handleRemoveItineraryFilter(filter)}
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
