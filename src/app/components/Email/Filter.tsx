"use client";

import { useCallback } from "react";
import { type Filter, FilterCode } from "@/app/types/email";
import { FILTERS } from "@/app/constants/filters";

interface FilterProps {
  onFilterClick: (filterCode: FilterCode) => void;
  selectedFilter: FilterCode
}

const Filter = ({ onFilterClick, selectedFilter }:FilterProps) => {
  const handleOnFilterClick = useCallback((code: FilterCode) => {
    onFilterClick(code);
  }, [onFilterClick]);

  return (
    <section className="col-span-12 flex items-center mt-6 mb-3">
      <div className="mr-6 w-max whitespace-nowrap text-black">Filter By: </div>
      <div className="flex gap-4 grow flex-wrap">
        {FILTERS.map((filter: Filter) => {
          return (
            <button
              key={filter.id}
              className={` rounded-2xl py-px px-3.5  ${
                selectedFilter===filter.code
                  ? "bg-backgroundAccent1 border border-neutralLight border-solid"
                  : "text-black bg-none"
              }`}
              onClick={() => handleOnFilterClick(filter.code)}
            >
              {filter.name}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default Filter;
