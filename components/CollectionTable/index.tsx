import Link from "next/link";
import React, { useState } from "react";
import { ICollection } from "../../interfaces/models/collection.interface";
import { getLocalDate } from "../../services/utils.service";
import { ConfirmationModal } from "../ConfirmationModal";

interface Props {
  data: Array<ICollection>;
  onDelete: (collection: ICollection) => void;
}

export const CollectionTable: React.FC<Props> = ({ data, onDelete }) => {
  const [toDelete, setToDelete] = useState<ICollection | null>(null);
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Last modified</th>
            <th></th>
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
                  <td>
                    <div className="flex justify-center">
                      <div>
                        <label
                          htmlFor="delete-link"
                          className="btn btn-sm btn-square btn-secondary"
                          onClick={() => setToDelete(collection)}
                        >
                          X
                        </label>
                      </div>
                      <div className="pl-4">
                        <Link href={`/collections/link/add/${collection.id}`}>
                          <a className="btn btn-sm btn-square btn-primary">+</a>
                        </Link>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ConfirmationModal
        id="delete-link"
        header="Are you sure you want to delete this link?"
        entity={toDelete}
        onConfirm={(entity) => onDelete(entity)}
        desc="Once deleted, you cannot get the link back. Also, you will loose any history tied to this link."
      />
    </div>
  );
};
