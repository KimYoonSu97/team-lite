import React from "react";

const ErrorText = ({ error }: { error?: string | undefined }) => {
  if (!error) {
    return null;
  }
  return <p className="text-caption text-system-error">{error}</p>;
};

export default ErrorText;
