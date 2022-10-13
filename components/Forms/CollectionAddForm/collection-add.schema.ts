import * as Yup from "yup";

export const CollectionAddSchema = Yup.object().shape({
  name: Yup.string().required("The name is required"),
});
