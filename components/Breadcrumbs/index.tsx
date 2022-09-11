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
                  {link.name === "Home" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  ) : (
                    <a>{link.name}</a>
                  )}
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
