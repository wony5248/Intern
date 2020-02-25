import React from "react";
import _ from "lodash";
import * as MUI from "@material-ui/core";
import * as MuiIcon from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import RouteContext from "context/RouteContext";
import FilterContext from "context/FilterContext";
import FilterOptions from "const/FilterOptions";

const useStyles = makeStyles(theme => ({
  searchBar: {
    boxShadow: theme.shadows[2]
  },
  magnify: {
    width: "17px",
    height: "17px",
    marginLeft: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputBase: {
    width: "111px",
    marginLeft: "18px",
    fontSize: "11px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    input: {
      padding: "0px"
    }
  },
  button: {
    width: "50px",
    fontSize: "11px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "0.2s",
    easing: "ease-out",
    boxSizing: "border-box",
    "&:hover": {
      background: "none"
    },
    opacity: 0,
    visibility: "hidden",

    "&.visible": {
      opacity: 1,
      visibility: "visible"
    }
  }
}));

const SearchBar = (props: any) => {
  const classes: any = useStyles();

  const routeInfo: any = React.useContext(RouteContext.Context);
  const filterInfo: any = React.useContext(FilterContext.Context);

  const searchBarRef: any = React.useRef(null);

  const { target } = props;

  const [isFocused, setIsFocused] = React.useState(false);
  const [searchInput, setSearchInput]: any = React.useState([]);

  React.useEffect(() => {
    if (target === "label" && routeInfo.params.dataKey) {
      setSearchInput(routeInfo.params.dataKey);
      return;
    }
    if (target === "asset" && routeInfo.params.key) {
      setSearchInput(routeInfo.params.key);
      return;
    }
    if (target === "dataset" && routeInfo.params.group) {
      setSearchInput(routeInfo.params.group);
      return;
    }

    setSearchInput([]);

    // eslint-disable-next-line
  }, [routeInfo.params]);

  const getSearchKey: any = () => {
    switch (target) {
      case "label":
        return "dataKey";
      case "asset":
        return "key";
      case "dataset":
        return "group";
      default:
        break;
    }
  };

  const getPlaceholder = () => {
    switch (target) {
      case "label":
        return "Search data key";
      case "asset":
        return "Search data key";
      case "dataset":
        return "Search dataset name";
      default:
        break;
    }
  };

  const handleChangeInput = (event: any) => {
    setSearchInput(event.target.value);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handleClickSearch();
    }
  };

  const handleClickSearch: any = () => {
    let params = routeInfo.params;

    if (routeInfo.params.page) {
      if (_.toInteger(routeInfo.params.page) > 1) {
        _.set(routeInfo.params, "page", 1);
      }
    }
    if (target === "label") {
      if (!_.isEmpty(_.filter(filterInfo.filters, ["filterBy", ""]))) {
        params = _.omit(
          routeInfo.params,
          _.compact(_.map(FilterOptions.filterBy, "value"))
        );
      }
    }

    const searchParams: any = new URLSearchParams(
      _.pickBy(
        _.set(_.clone(params), getSearchKey(), searchInput.normalize()),
        v => !_.isEmpty(v)
      )
    );

    routeInfo.history.push(`?${searchParams.toString()}`);
  };

  return (
    <MUI.Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      width="224px"
      height="28px"
      borderRadius="7px"
      //   ref={searchBarRef}
      className={classes.searchBar}
    >
      <MuiIcon.Search className={classes.magnify} />
      <MUI.InputBase
        className={classes.inputBase}
        // placeholder={(target && !isFocused) && getPlaceholder()}
        value={searchInput}
        onChange={handleChangeInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
      />
      <MUI.Button
        color="primary"
        className={`${classes.button} ${(searchInput.length !== 0 ||
          isFocused) &&
          "visible"}`}
        onClick={handleClickSearch}
      >
        Search
      </MUI.Button>
    </MUI.Box>
  );
};

export default SearchBar;
