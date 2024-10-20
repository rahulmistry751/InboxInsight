import { useCallback } from "react";
import Icons from "./Icons/Icons";

interface PaginationProps {
  count: number;
  onPageClick: (pageNumber: number) => void;
  selectedPageNumber: number
}

const Pagination = ({
  count,
  onPageClick,
  selectedPageNumber,
}: PaginationProps) => {

  const handleOnPageClick = useCallback((pageNumber: number) => {
    onPageClick(pageNumber);
  },[onPageClick]);

  return (
    <div className="flex gap-4">
      {selectedPageNumber !== 1 ? (
        <button
          className="rounded-full border border-neutralLight w-8 h-8 bg-white p-1 flex justify-center items-center"
          onClick={() => {
            handleOnPageClick(selectedPageNumber - 1);
          }}
        >
          <Icons type={"leftArrow"} />
        </button>
      ) : null}
      <div className="flex gap-2">
        {Array.from({ length: count }, (_, index) => (
          <button
            key={index}
            className={`rounded-full border border-neutralLight w-8 h-8  ${
              selectedPageNumber === index + 1
                ? "bg-backgroundAccent1"
                : "bg-white"
            } `}
            onClick={() => {
              handleOnPageClick(index + 1);
            }}
            disabled={selectedPageNumber === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
      {selectedPageNumber !== count ? (
        <button
          className="rounded-full border border-neutralLight w-8 h-8 bg-white p-1 flex justify-center items-center"
          onClick={() => {
            handleOnPageClick(selectedPageNumber + 1);
          }}
        >
          <Icons type={"rightArrow"} />
        </button>
      ) : null}
    </div>
  );
};

export default Pagination;
