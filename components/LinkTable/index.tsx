import React from "react";
import { IUrl } from "../../interfaces/models/url.interface";
import { Badge } from "../Badge";

interface Props {
  data: Array<IUrl>;
}

export const LinksTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>URL</th>
            <th>Status</th>
            <th>Last modified</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.length > 0 &&
            data.map((url, key) => {
              return (
                <tr key={key} className="hover">
                  <th>{key + 1}</th>
                  <td>
                    {url.url}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {url.active === true ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    {url.failing === true ? (
                      <Badge text="Red" badgeType="badge-secondary" />
                    ) : (
                      <Badge text="Green" badgeType="badge-accent" />
                    )}
                  </td>
                  <td>{url.updated_at}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
