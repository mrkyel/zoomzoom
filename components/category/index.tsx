import React, { useState } from "react";
import { useAtom } from "jotai";
import { selectedFiltersAtom } from "./../../atoms/filter";
import { filters } from "./../../lib/filters";
import styles from "./Category.module.scss";

const Category: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useAtom(selectedFiltersAtom);
  const [isTourTypeDropdownOpen, setTourTypeDropdownOpen] = useState(false);
  const [isItineraryDropdownOpen, setItineraryDropdownOpen] = useState(false);

  const handleToggleTourTypeDropdown = () => {
    setTourTypeDropdownOpen(prevOpen => !prevOpen);
    setItineraryDropdownOpen(false);
  };

  const handleToggleItineraryDropdown = () => {
    setItineraryDropdownOpen(prevOpen => !prevOpen);
    setTourTypeDropdownOpen(false);
  };

  const handleTourTypeFilterToggle = (filterKey: string) => {
    setSelectedFilters(prevFilters => {
      const filterIndex = prevFilters.tourType.indexOf(filterKey);
      if (filterIndex !== -1) {
        return {
          ...prevFilters,
          tourType: prevFilters.tourType.filter(key => key !== filterKey),
        };
      } else {
        return {
          ...prevFilters,
          tourType: [...prevFilters.tourType, filterKey],
        };
      }
    });
  };

  const handleItineraryFilterToggle = (filterKey: string) => {
    setSelectedFilters(prevFilters => {
      const updatedFilter = prevFilters.itinerary.includes(filterKey)
        ? prevFilters.itinerary.filter(key => key !== filterKey)
        : [filterKey];
      return {
        ...prevFilters,
        itinerary: updatedFilter,
      };
    });
  };

  const getSelectedTourTypeCount = () => {
    return selectedFilters.tourType.length;
  };

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <h1 className={styles.city}>미국 라스베가스</h1>
        <div className={styles.dropdown}>
          <div
            className={`${styles.dropdownButton} ${
              selectedFilters.tourType.length > 0 ? styles.selected : ""
            }`}
            onClick={handleToggleTourTypeDropdown}
          >
            상품 유형
            {selectedFilters.tourType.length > 0 ? (
              <div className={styles.round}>
                {selectedFilters.tourType.length}
              </div>
            ) : (
              <div className={styles.arrow} />
            )}
            {isTourTypeDropdownOpen && (
              <div className={styles.dropdownContent}>
                {filters.tourTypes.map(filter => (
                  <div
                    key={filter.key}
                    className={`${styles.dropdownItem} ${
                      selectedFilters.tourType.includes(filter.key)
                        ? styles.selected
                        : ""
                    }`}
                    onClick={() => handleTourTypeFilterToggle(filter.key)}
                  >
                    {filter.text}
                    {selectedFilters.tourType.includes(filter.key) && (
                      <span className={styles.checkmark}>✔</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            className={styles.dropdownButton}
            onClick={handleToggleItineraryDropdown}
          >
            예약 기간
            <div className={styles.arrow}></div>
            {isItineraryDropdownOpen && (
              <div className={styles.dropdownContent}>
                {filters.itinerary.map(filter => (
                  <div
                    key={filter.key}
                    className={`${styles.dropdownItem} ${
                      selectedFilters.itinerary.includes(filter.key)
                        ? styles.selected
                        : ""
                    }`}
                    onClick={() => handleItineraryFilterToggle(filter.key)}
                  >
                    {filter.text}
                    {selectedFilters.itinerary.includes(filter.key) && (
                      <span className={styles.checkmark}>✔</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
