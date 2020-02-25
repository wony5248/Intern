import React from "react";
import _ from "lodash";
import * as MUI from "@material-ui/core";

import RouteContext from "../../context/RouteContext";
import TablePaginationAction from "./TablePaginationAction";

const TablePagination = (props: any) => {
  const routeInfo: any = React.useContext(RouteContext.Context);
  const { totalCount }: any = props;

  const page = routeInfo.params.page ? _.toInteger(routeInfo.params.page) : 1;
  const rowsPerPage = routeInfo.params.pageSize
    ? _.toInteger(routeInfo.params.pageSize)
    : 10;

  const handleChangePage = (event: any, newPage: any) => {
    const searchParams = new URLSearchParams(
      _.set(_.clone(routeInfo.params), "page", newPage + 1)
    );
    routeInfo.history.push(`?${searchParams.toString()}`);
  };

  const handleChangeRowsPerPage = (event: any) => {
    const rowsPerPage = event.target.value;
    const searchParams = new URLSearchParams(
      _.assign(_.clone(routeInfo.params), { pageSize: rowsPerPage, page: 1 })
    );
    routeInfo.history.push(`?${searchParams.toString()}`);
  };

  if (totalCount === 0) return <React.Fragment />;

  return (
    <MUI.TablePagination
      rowsPerPageOptions={[10, 25, 50]}
      component="div"
      count={totalCount}
      rowsPerPage={rowsPerPage}
      page={page - 1}
      labelDisplayedRows={() => ""}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      ActionsComponent={TablePaginationAction}
    />
  );
};

export default TablePagination;
