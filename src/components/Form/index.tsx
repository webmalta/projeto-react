import './form.scss';
import { FormEvent } from "react";
import Button from "components/Button";

interface FormProps<T> {
  title: string;
  formData: T;
  onChange: (field: keyof T, value: string) => void;
  onSubmit: (event: FormEvent) => void;
  onCancel: () => void;
  submitText: string;
  cancelText: string;
}

function Form<T extends Record<string, any>>({
  title,
  formData,
  onChange,
  onSubmit,
  onCancel,
  submitText,
  cancelText,
}: FormProps<T>) {
  return (
    <div className="container-form">
      <h1>{title}</h1>
      <form onSubmit={onSubmit} role="form">
        {["name", "type", "histories"].map((field) => {
          const value = formData[field as keyof T];
          return (
            <div key={field}>
              <label htmlFor={field}>
                {field === "name" ? "Nome" : field === "type" ? "Tipo" : field === "histories" ? "Descrição" : field}
              </label>
              {field === "histories" ? (
                <textarea
                  id={field}
                  name={field}
                  rows={5}
                  value={value}
                  onChange={(e) => onChange(field as keyof T, e.target.value)}
                />
              ) : (
                <input
                  id={field}
                  type="text"
                  name={field}
                  value={value}
                  onChange={(e) => onChange(field as keyof T, e.target.value)}
                />
              )}
            </div>
          );
        })}
        <div className="group-buttons">
          <Button theme="btn-max" type="submit">
            {submitText}
          </Button>
          <Button theme="btn-max" onClick={onCancel}>
            {cancelText}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Form;