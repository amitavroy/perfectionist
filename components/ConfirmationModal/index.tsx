import React from "react";

interface Props {
  id: string;
  entity: any;
  onConfirm: (data: any) => void;
  header?: string;
  buttonText?: string;
  desc?: string;
}

export const ConfirmationModal: React.FC<Props> = ({
  id,
  header,
  entity,
  onConfirm,
  buttonText,
  desc,
}) => {
  return (
    <React.Fragment>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          {header && <h3 className="font-bold text-lg">{header}</h3>}
          {desc && <p className="py-4">{desc}</p>}
          <div className="modal-action">
            <label htmlFor={id} className="btn btn-ghost btn-outline">
              Cancel
            </label>

            <label
              htmlFor={id}
              className="btn btn-primary"
              onClick={() => onConfirm(entity)}
            >
              {buttonText || "Submit"}
            </label>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
