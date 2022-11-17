import Link from "next/link";
import React, { useState } from "react";
import { Eye, Trash2 } from "react-feather";
import { IUrl } from "../../interfaces/models/url.interface";
import { getLocalDate } from "../../services/utils.service";
import { Badge } from "../Badge";
import { ConfirmationModal } from "../ConfirmationModal";

interface Props {
  data: Array<IUrl>;
  onDelete: (url: IUrl) => void;
}

export const LinksTable: React.FC<Props> = ({ data, onDelete }) => {
  const [toDelete, setToDelete] = useState<IUrl | null>(null);
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>URL</th>
            <th>Avg resp time</th>
            <th>Status</th>
            <th>Last modified</th>
            <th></th>
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
                  <td>{url.avg_time} ms</td>
                  <td>
                    {url.failing === true ? (
                      <Badge text="Red" badgeType="badge-secondary" />
                    ) : (
                      <Badge text="Green" badgeType="badge-accent" />
                    )}
                  </td>
                  <td>{getLocalDate(url.updated_at)}</td>
                  <td>
                    <div className="flex">
                      <div className="mr-6">
                        <Link href={`/urls/view/${url.id}`}>
                          <a>
                            <Eye />
                          </a>
                        </Link>
                      </div>
                      <div>
                        <label
                          htmlFor="delete-link"
                          className="cursor-pointer"
                          onClick={() => setToDelete(url)}
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
