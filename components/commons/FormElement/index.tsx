import { FormFieldError } from "../FormFieldError";

interface Props {
  label: string;
  name: string;
  children?: any;
  errors: any;
  touched: any;
}

export const FormElement: React.FC<Props> = ({
  label,
  name,
  children,
  errors,
  touched,
}) => {
  return (
    <div className="mt-4">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <div className="relative mt-1">{children}</div>
      <FormFieldError name={name} errors={errors} touched={touched} />
    </div>
  );
};
