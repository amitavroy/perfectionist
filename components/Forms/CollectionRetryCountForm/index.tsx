import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { useEffect, useState } from "react";

import HttpService from "../../../services/http.services";
import { FormElement } from "../../commons/FormElement";
import { Heading2 } from "../../commons/Headings/Heading2";

interface Props {
  collectionId: string;
  retryCountValues: Array<string> | null;
  collectionFreq: string;
}

interface IValues {
  retry_count: string;
}

export const CollectionRetryCountForm: React.FC<Props> = ({
  collectionId,
  retryCountValues,
  collectionFreq,
}) => {
  const [retryCount, setRetryCount] = useState("3");


  const initialValues: IValues = {
    retry_count: '3',
  };


  const onFormSubmit = async (
    values: IValues,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<IValues>
  ) => {
    await HttpService.post("collection/settings", {
      collection_id: collectionId,
      name: "retry_count",
      value: retryCount,
    });
    resetForm();
  };

  useEffect(() => {
    setRetryCount(collectionFreq);
  }, [collectionFreq]);

  return (
    <Formik initialValues={initialValues} onSubmit={onFormSubmit}>
      {({ errors, touched }) => (
        <Form>
          <Heading2 text="Retry Count" />
          <FormElement
            name="retry_count"
            label="Select the retry count i.e how many attempt should perfectionist make before giving and error."
            errors={errors}
            touched={touched}
          >
            {retryCountValues != null && (
              <Field
                as="select"
                name="retry_count"
                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                value={retryCount}
                onChange={(event: any) => setRetryCount(event.target.value)}
              >
                {retryCountValues?.map((freq) => {
                  return (
                    <option value={freq} key={freq}>
                      {freq}
                    </option>
                  );
                })}
              </Field>
            )}
          </FormElement>

          <div className="mt-4">
            <button className="btn btn-primary" type="submit">
              Save
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
