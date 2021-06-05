import { useEffect } from "react";

const ErrorComponent = () => {
  useEffect(() => {
    throw Error(" I am a Mock Error");
  }, []);

  return <></>;
};

export default ErrorComponent;
