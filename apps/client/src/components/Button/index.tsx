import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
}

const index = (props: ButtonProps) => {
  return <button {...props}>{props.name}</button>;
};

export default index;
