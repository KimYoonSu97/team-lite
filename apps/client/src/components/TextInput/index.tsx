import React from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: "s" | "m" | "l";
}

const index = (props: TextInputProps) => {
  return <input {...props} />;
};

export default index;
