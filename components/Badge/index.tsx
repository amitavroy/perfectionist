import React from "react";

interface Props {
  badgeType:
    | "badge-primary"
    | "badge-secondary"
    | "badge-accent"
    | "badge-ghost"
    | "";
  text: string;
}

export const Badge: React.FC<Props> = ({ badgeType, text }) => {
  return <div className={`badge ${badgeType}`}>{text}</div>;
};
