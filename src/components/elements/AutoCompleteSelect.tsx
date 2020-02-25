import * as React from "react";
import * as MUI from "@material-ui/core";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import CreatableSelect from "react-select/creatable";
import AsyncCreatableSelect from "react-select/async-creatable";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import classNames from "classnames";
import debounce from "debounce-promise";

const useStyles = makeStyles(theme => ({
  select: {
    fontSize: "13px",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.05)"
    },
    "& .AutoSelect__indicator": {
      "& svg": {
        width: "13px",
        height: "13px"
      },
      "&[class$=indicatorContainer]": {
        padding: "6px"
      }
    },
    "& .AutoSelectCreate__indicator": {
      "& svg": {
        width: "13px",
        height: "13px"
      },
      "&[class$=indicatorContainer]": {
        padding: "6px"
      }
    }
  },
  paper: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 1,
    marginTop: theme.spacing(1),
    "& [class$=MenuList]": {
      maxHeight: "200px"
    }
  }
}));

const AutoCompleteSelectStyles = {
  control: (styles: any) => ({
    ...styles,
    minHeight: "initial",
    boxShadow: "none"
  }),
  indicator: (styles: any) => ({
    ...styles,
    padding: "6px",
    color: "#797979",
    "& svg": {
      width: "13px",
      height: "13px"
    }
  }),
  indicatorSeparator: (styles: any) => ({
    ...styles,
    display: "none"
  }),
  placeholder: (styles: any) => ({
    ...styles,
    color: "#797979"
  }),
  multiValueRemove: (styles: any) => ({
    ...styles,
    color: "#797979",
    paddingLeft: "2px",
    paddingRight: "2px",
    ":hover": {
      backgroundColor: "transparent",
      color: "#333"
    }
  }),
  input: (styles: any) => ({
    ...styles,
    paddingTop: 0,
    paddingBottom: 0
  })
};

const AutoCompleteSelectTheme = (theme: any) => {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      primary: "rgba(0, 0, 0, 0.3)",
      primary25: "rgba(0, 0, 0, 0.14)",
      primary50: "rgba(0, 0, 0, 0.14)"
    }
  };
};

const Option = (props: any) => {
  return <MUI.MenuItem {...props.innerProps}>{props.children}</MUI.MenuItem>;
};

const Menu = (props: any) => {
  const classes = useStyles();

  return (
    <MUI.Paper className={classes.paper} {...props.innerProps}>
      {props.children}
    </MUI.Paper>
  );
};

const components = {
  Option,
  Menu
};

const AutoCompleteSelect = (props: any) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const {
    className,
    creatable,
    asynchronous,
    asyncCreatable,
    styles,
    onAsyncSearch,
    ...otherProps
  } = props;

  if (creatable) {
    return (
      <CreatableSelect
        {...otherProps}
        className={classNames(classes.select, className)}
        components={components}
        classNamePrefix="AutoSelectCreate"
        theme={theme => AutoCompleteSelectTheme(theme)}
        styles={{ ...AutoCompleteSelectStyles, ...styles }}
      />
    );
  }

  if (asynchronous) {
    return (
      <AsyncSelect
        {...otherProps}
        className={classNames(classes.select, className)}
        components={components}
        classNamePrefix="AutoSelect"
        theme={theme => AutoCompleteSelectTheme(theme)}
        styles={{ ...AutoCompleteSelectStyles, ...styles }}
        loadOptions={debounce(
          async inputValue => await onAsyncSearch(inputValue),
          1000,
          { leading: true }
        )}
      />
    );
  }

  if (asyncCreatable) {
    return (
      <AsyncCreatableSelect
        {...otherProps}
        className={classNames(classes.select, className)}
        components={components}
        classNamePrefix="AutoSelect"
        theme={theme => AutoCompleteSelectTheme(theme)}
        styles={{ ...AutoCompleteSelectStyles, ...styles }}
        loadOptions={debounce(
          async inputValue => await onAsyncSearch(inputValue),
          1000,
          { leading: true }
        )}
      />
    );
  }

  return (
    <Select
      {...otherProps}
      className={classNames(classes.select, className)}
      components={components}
      classNamePrefix="AutoSelect"
      theme={theme => AutoCompleteSelectTheme(theme)}
      styles={{ ...AutoCompleteSelectStyles, ...styles }}
    />
  );
};

export default AutoCompleteSelect;
