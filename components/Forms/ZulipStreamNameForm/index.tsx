import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { useEffect, useState } from "react";

import HttpService from "../../../services/http.services";
import { FormElement } from "../../commons/FormElement";
import { Heading2 } from "../../commons/Headings/Heading2";

interface IValues {
  stream_name: string;
}

interface Props {
  collectionId: string;
}

export const ZulipStreamNameForm: React.FC<Props> = ({ collectionId }) => {
  const initialValues: IValues = {
    stream_name: "",
  };

  const [streamName, setStreamName] = useState("");

  const onFormSubmit = async (
    values: IValues,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<IValues>
  ) => {
    await HttpService.post("collection/settings/key/save", {
      collection_id: collectionId,
      name: "stream_name",
      value: streamName,
    });
    resetForm();
  };

  const getStreamName = async () => {
    const resp = await HttpService.post("collection/settings/key/get", {
      collection_id: collectionId,
      name: "stream_name",
    });
    setStreamName(resp.data.data.value);
  };

  useEffect(() => {
    getStreamName();
  }, []);

  return (
    <Formik initialValues={initialValues} onSubmit={onFormSubmit}>
      {({ errors, touched }) => (
        <Form>
          <Heading2 text="Zulip stream name" />
          <FormElement
            name="stream_name"
            label="Enter the stream name"
            errors={errors}
            touched={touched}
          >
            <Field
              id="stream_name"
              name="stream_name"
              placeholder="Enter the stream name"
              className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
              value={streamName}
              onChange={(event: any) => setStreamName(event.target.value)}
            />
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
