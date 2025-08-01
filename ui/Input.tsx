import { ChangeEvent, InputHTMLAttributes, ReactNode, useRef } from "react";
import Image, { StaticImageData } from "next/image";

type InputProps = {
  name?: string;
  icon?: StaticImageData;
  labelText?: ReactNode;
  placeholder: string;
  className: string;
  required: boolean;
  checked?: boolean;
  textArea?: boolean;
  type: string;
  value?: string;
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void | undefined;
  onFocus?: () => void;
  onBlur?: () => void;
};

export default function Input({
  name,
  icon,
  labelText,
  placeholder,
  className,
  type,
  checked,
  textArea,
  required,
  value,
  onChange,
  onFocus,
  onBlur,
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = name || placeholder || type;
  const inputProps: InputHTMLAttributes<HTMLInputElement> = {
    id: name || inputId,
    name,
    placeholder,
    className,
    type,
    checked,
    required,
    value,
    onChange,
    onFocus,
    onBlur,
  };

  if (type === "checkbox") {
    inputProps.checked = checked;
    return <input {...inputProps} style={{ display: "none" }} />;
  } else if (!textArea) {
    return (
      <>
        {labelText && (
          <label
            htmlFor={inputId}
            style={{ fontSize: "20px", fontWeight: "400" }}
          >
            {labelText}
          </label>
        )}
        {icon && labelText ? (
          <div
            style={{ marginTop: "8px", width: "440px" }}
            /* className={styles["container-input"]} */
          >
            <input ref={inputRef} {...inputProps} />
            <Image
              width={24}
              height={24}
              priority
              src={icon}
              alt="Logo for Input"
            />
          </div>
        ) : (
          <>
            <input
              ref={inputRef}
              className={type === "date" ? "input-icon-date" : ""}
              onClick={() => {
                if (type === "date" && inputRef.current) {
                  inputRef.current.focus();
                  inputRef.current.showPicker?.();
                }
              }}
              {...inputProps}
            />
            {icon && (
              <Image
                className={type === "date" ? "input-icon-date" : ""}
                src={icon}
                alt="Logo for Input"
              />
            )}
          </>
        )}
      </>
    );
  } else {
    return (
      <>
        {labelText && (
          <label style={{ fontSize: "20px", fontWeight: "400" }} htmlFor={name}>
            {labelText}
          </label>
        )}
        <textarea
          id={inputId}
          name={name}
          placeholder={placeholder}
          className={className}
          required={required}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </>
    );
  }
}
