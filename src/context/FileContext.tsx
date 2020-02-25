import React, { createContext } from "react";

const Context: any = React.createContext(undefined);
interface FileProps {
  children: React.ReactNode;
  files: string[];
  urls: string[];
  dataset: string;
}
const FileProvider = (props: FileProps) => {
  const { children } = props;

  const [files, setFiles] = React.useState([]);
  const [urls, setUrls] = React.useState([]);
  const [dataset, setDataset] = React.useState("");

  return (
    <Context.Provider
      value={{
        files,
        setFiles,
        urls,
        setUrls,
        dataset,
        setDataset
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default {
  Context,
  Provider: FileProvider
};
