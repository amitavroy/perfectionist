import { Field, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/router";

import AuthService from "../../../services/auth.service";
import HttpService from "../../../services/http.services";
import { setFormikErrors } from "../../../services/utils.service";
import { FormElement } from "../../commons/FormElement";

interface IValues {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const router = useRouter();
  const initialValues: IValues = {
    email: "",
    password: "",
  };
  const onFormSubmit = async (
    values: IValues,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<IValues>
  ) => {
    const postData = {
      email: values.email,
      password: values.password,
      device_name: "web",
    };
    try {
      const resp = await HttpService.post("login", postData);
      if (resp.status === 200) {
        AuthService.saveAuthToken(resp.data.token);
        resetForm();
        router.push("/");
      }
    } catch (error: any) {
      if (error.response.status === 422) {
        setFormikErrors(error.response.data.errors, setFieldError);
      }
    }
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onFormSubmit}>
      {({ errors, touched }) => (
        <Form>
          <FormElement
            name="email"
            label="Enter the email"
            errors={errors}
            touched={touched}
          >
            <Field
              id="email"
              name="email"
              placeholder="Enter the email"
              className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
            />
          </FormElement>

          <FormElement
            name="password"
            label="Enter the password"
            errors={errors}
            touched={touched}
          >
            <Field
              id="password"
              name="password"
              placeholder="Enter the password"
              className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
              type="password"
            />
          </FormElement>
          <div className="mt-4">
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
