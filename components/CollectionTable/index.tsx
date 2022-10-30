import Link from "next/link";
import React, { useState } from "react";
import { Eye, PlusCircle, Settings, Trash2 } from "react-feather";
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
                      {/* View icon */}
                      <div className="pr-6">
                        <Link href={`/collections/link/view/${collection.id}`}>
                          <a>
                            <Eye />
                          </a>
                        </Link>
                      </div>
                      {/* Add icon */}
                      <div className="pr-6">
                        <Link href={`/collections/link/add/${collection.id}`}>
                          <a>
                            <PlusCircle />
                          </a>
                        </Link>
                      </div>
                      {/* Settings icon */}
                      <div className="pr-6">
                        <Link href={`/collections/settings/${collection.id}`}>
                          <a>
                            <Settings />
                          </a>
                        </Link>
                      </div>
                      {/* Delete icon */}
                      <div>
                        <label
                          htmlFor="delete-link"
                          className="cursor-pointer"
                          onClick={() => setToDelete(collection)}
                        >
                          <Trash2 />
                        </label>
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
