import React, { useEffect, useState } from "react";

import { IPaginatedData } from "../../interfaces/commons/paginate.interface";

interface Props {
  data: IPaginatedData;
  onChange: (pageNum: number) => void;
}

export const Pagination: React.FC<Props> = ({ data, onChange }) => {
  const { current_page, total } = data;
  const [currentPage, setCurrentPage] = useState<number>(current_page);

  const pageClicked = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  const backNextClick = (action: "increment" | "decrement") => {
    if (action === "increment" && currentPage != total) {
      setCurrentPage(currentPage + 1);
    }
    if (action === "decrement" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    onChange(currentPage);
  }, [currentPage]);

  return (
    <div className="btn-group mt-4">
      <button className="btn" onClick={() => backNextClick("decrement")}>
        «
      </button>
      {data.links.map((link, index) => {
        const btnClass = currentPage == link.label ? "btn btn-active" : "btn";
        if (index === data.links.length - 1 || index === 0) return null;
        return (
          <button
            className={btnClass}
            onClick={() => pageClicked(index)}
            key={index}
          >
            {link.label}
          </button>
        );
      })}
      <button className="btn" onClick={() => backNextClick("increment")}>
        »
      </button>
    </div>
  );
};
