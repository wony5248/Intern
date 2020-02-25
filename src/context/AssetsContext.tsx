import * as React from "react";
import _ from "lodash";

import AssetsService from "services/AssetsService";

const Context = React.createContext<any | undefined>(undefined);
interface AssetsProps {
  assets: any;
  datasets: any;
  totalDatasetCount: number;
  datasetsOptions: string;
  totalCount: number;
  children: React.ReactNode;
}
const AssetsProvider = (props: any) => {
  const [assets, setAssets] = React.useState([]);
  const [datasets, setDatasets] = React.useState([]);
  const [totalDatasetCount, setTotalDatasetCount] = React.useState(0);
  const [datasetsOptions, setDatasetsOptions] = React.useState([]);
  const [totalCount, setTotalCount] = React.useState(0);

  const updateAssets = async (params: any) => {
    setAssets([]);
    // tslint:disable-next-line: no-shadowed-variable
    const assets = await AssetsService.getAssets(params);

    if (!assets) return;

    setAssets(assets.results);
    setTotalCount(assets.count);
  };

  const updateDatasets = async (params: any, hasAllOption = true) => {
    setDatasets([]);
    // tslint:disable-next-line: no-shadowed-variable
    const datasets = await AssetsService.getDatasets(params);

    if (!datasets) return;
    // tslint:disable-next-line: no-shadowed-variable
    const datasetsOptions: any = hasAllOption
      ? _.concat(
          [
            {
              label: "all",
              options: [
                { label: "[ all datasets ]", value: "[ all datasets ]" }
              ]
            }
          ],
          {
            label: "datasets",
            options: _.map(datasets.results, dataset => ({
              value: dataset.group,
              label: dataset.group
            }))
          }
        )
      : _.map(datasets.results, dataset => ({
          value: dataset.group,
          label: dataset.group
        }));

    setDatasets(datasets.results);
    setTotalDatasetCount(datasets.count);
    setDatasetsOptions(datasetsOptions);
  };

  return (
    <Context.Provider
      value={{
        assets,
        setAssets,
        updateAssets,
        totalCount,
        setTotalCount,
        datasets,
        setDatasets,
        updateDatasets,
        totalDatasetCount,
        setTotalDatasetCount,
        datasetsOptions,
        setDatasetsOptions
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default {
  Context,
  Provider: AssetsProvider
};
