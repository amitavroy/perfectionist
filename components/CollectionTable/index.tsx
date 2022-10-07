import React from "react";
import { ICollection } from "../../interfaces/models/collection.interface";
import { getLocalDate } from "../../services/utils.service";

interface Props {
  data: Array<ICollection>;
}

export const CollectionTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Last modified</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.length > 0 &&
            data.map((collection, key) => {
              return (
                <tr key={key} className="hover">
                  <th>{key + 1}</th>
                  <td>{collection.name}</td>
                  <td>{getLocalDate(collection.updated_at)}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
