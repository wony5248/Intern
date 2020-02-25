import * as React from "react";

const Context = React.createContext<any | undefined>(undefined);

const FilterProvider = (props: any) => {
  const [filters, setFilters] = React.useState([
    { filterBy: "", condition: "", options: [] }
  ]);

  return (
    <Context.Provider
      value={{
        filters,
        setFilters
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default {
  Context,
  Provider: FilterProvider
};
