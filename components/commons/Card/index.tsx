import React from "react";

interface Props {
  children: React.ReactNode;
}

export const Card: React.FC<Props> = ({ children }) => {
  return <div className="shadow rounded p-10 bg-white">{children}</div>;
};
