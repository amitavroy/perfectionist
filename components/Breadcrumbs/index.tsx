import Link from "next/link";
import React from "react";

interface Props {
  links: Array<IBreadcrumbLink>;
}

export interface IBreadcrumbLink {
  name: string;
  link?: string;
}

export const Breadcrumbs: React.FC<Props> = ({ links }) => {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        {links &&
          links.length > 0 &&
          links.map((link, key) => {
            return (
              <li key={key}>
                <Link href={`${link.link ? link.link : "#"}`}>
                  <a>{link.name}</a>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
