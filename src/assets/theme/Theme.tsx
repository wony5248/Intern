import { createMuiTheme } from "@material-ui/core/styles";
const ColorTheme = {
  palette: {
    primary: {
      light2: "#fff9f9",
      light: "#ffeceb",
      main: "#ff625a",
      dark: "#e55851",
      contrastText: "#ffffff"
    },
    secondary: {
      light: "#ebeeff",
      main: "#5a7bff",
      contrastText: "#ffffff"
    },
    error: {
      light: "#fff8e4",
      main: "#ffcc00"
    },
    green: {
      light: "#EDFBDD",
      main: "#a3eb57"
    },
    orange: {
      light: "#fff3f2",
      main: "#ff9772"
    },
    navy: {
      main: "#242d37"
    }
  }
};

const ShadowsTheme = {
  shadows: [
    "none",
    "0 2px 6px 0 rgba(208, 208, 208, 0.5)",
    "0 2px 10px 0 rgba(169, 169, 169, 0.26)",
    "0 2px 10px 0 rgba(169, 169, 169, 0.26)",
    "0 2px 10px 0 rgba(169, 169, 169, 0.26)",
    "0 2px 10px 0 rgba(169, 169, 169, 0.26)",
    "0 2px 10px 0 rgba(169, 169, 169, 0.26)",
    "0 2px 10px 0 rgba(169, 169, 169, 0.26)",
    "0 2px 10px 0 rgba(169, 169, 169, 0.26)",
    "0 2px 10px 0 rgba(169, 169, 169, 0.26)",
    "0 2px 10px 0 rgba(169, 169, 169, 0.26)",
    "0 2px 10px 0 rgba(169, 169, 169, 0.26)",
    "0 2px 10px 0 rgba(169, 169, 169, 0.26)",
    "0 2px 10px 0 rgba(169, 169, 169, 0.26)",
    "0 2px 10px 0 rgba(169, 169, 169, 0.26)",
    "0 2px 10px 0 rgba(169, 169, 169, 0.26)",
    "0 2px 10px 0 rgba(169, 169, 169, 0.26)",
    "0 2px 10px 0 rgba(169, 169, 169, 0.26)",
    "0 2px 10px 0 rgba(169, 169, 169, 0.26)",
    "0 2px 10px 0 rgba(169, 169, 169, 0.26)",
    "0 2px 10px 0 rgba(169, 169, 169, 0.26)",
    "0 2px 10px 0 rgba(169, 169, 169, 0.26)",
    "0 2px 10px 0 rgba(169, 169, 169, 0.26)",
    "0 2px 10px 0 rgba(169, 169, 169, 0.26)",
    "0 2px 10px 0 rgba(169, 169, 169, 0.26)"
  ]
};

const Theme = (createMuiTheme as any)({
  ...ColorTheme,
  ...ShadowsTheme,
  typography: {
    useNextVariants: true,
    fontFamily: [
      "Roboto",
      "SofiaProRegular",
      "SofiaProLight",
      "SofiaProMedium"
    ].join(", ")
  },
  spacing: 10,
  overrides: {
    MuiSkeleton: {
      root: {
        backgroundColor: "rgba(0, 0, 0, 0.05)"
      },
      animate: {
        animation: "MuiSkeleton-keyframes-animate 2.5s ease-in-out infinite"
      }
    },
    MuiInput: {
      underline: {
        "&.Mui-disabled:before": {
          borderBottomStyle: "none"
        },
        "&::after": {
          borderBottom: "none"
        },
        "&::before": {
          borderBottom: "none"
        },
        "&:hover:not(.Mui-disabled):before": {
          borderBottom: "none"
        }
      }
    },
    MuiFilledInput: {
      root: {
        backgroundColor: "transparent",
        "&:hover": {
          backgroundColor: "transparent"
        },
        "&.Mui-focused": {
          backgroundColor: "transparent"
        },
        "& + .MuiFormHelperText-contained": {
          margin: "8px 0px 0px 0px"
        }
      },
      input: {
        paddingLeft: 0,
        paddingRight: 0
      }
    },
    MuiInputLabel: {
      filled: {
        transform: "translateY(24px) scale(1)",
        "& + .MuiInput-formControl": {
          marginTop: "16px"
        },
        "&.MuiInputLabel-shrink": {
          transform: "translateY(10px) scale(0.75)"
        },
        "&.MuiInputLabel-marginDense": {
          transform: "translateY(20px) scale(1)",
          "&.MuiInputLabel-shrink.MuiInputLabel-animated": {
            transform: "translateY(8px) scale(0.75)"
          }
        }
      }
    },
    MuiInputBase: {
      root: {
        fontSize: "12px"
      }
    },
    MuiSelect: {
      select: {
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.05)"
        }
      }
    },
    MuiPaper: {
      rounded: {
        borderRadius: "7px"
      },
      root: {
        boxShadow: ShadowsTheme.shadows[2]
      }
    },
    MuiList: {
      padding: {
        paddingTop: "5px",
        paddingBottom: "5px"
      }
    },
    MuiMenuItem: {
      root: {
        minHeight: "35px",
        fontSize: "12px",
        "@media (min-width: 600px)": {
          minHeight: "35px"
        }
      }
    },
    MuiButton: {
      root: {
        color: "#4e4e4e",
        textTransform: "capitalize",
        fontWeight: 500,
        whiteSpace: "nowrap",
        minWidth: "initial",
        paddingTop: "4px",
        paddingBottom: "4px"
      },
      contained: {
        borderRadius: "7px",
        backgroundColor: "#ffffff",
        boxShadow: ShadowsTheme.shadows[2],
        "&.Mui-disabled": {
          backgroundColor: "rgba(0, 0, 0, 0.04)"
        }
      },
      outlined: {
        borderRadius: "7px",
        border: "1px solid #ababab",
        paddingTop: "3px",
        paddingBottom: "3px"
      }
    },
    MuiCheckbox: {
      root: {
        padding: "3px"
      }
    },
    MuiTab: {
      root: {
        textTransform: "capitalize",
        fontFamily: "SofiaProRegular",
        fontWeight: "normal",
        fontSize: "13px",
        "@media (min-width: 960px)": {
          fontSize: "13px"
        }
      },
      textColorInherit: {
        opacity: 1
      }
    },
    MuiTypography: {
      root: {
        fontWeight: "normal",
        wordWrap: "break-word"
      },
      body1: {
        fontSize: "11px"
      },
      body2: {
        fontSize: "12px"
      },
      subtitle1: {
        fontSize: "13px",
        fontWeight: "normal"
      },
      subtitle2: {
        fontSize: "14px",
        fontWeight: "normal"
      },
      h1: {
        fontSize: "22px",
        fontWeight: 400
      },
      h2: {
        fontFamily: "SofiaProMedium",
        fontSize: "17px",
        fontWeight: "normal"
      },
      h3: {
        fontSize: "16px",
        fontWeight: 500
      },
      h4: {
        fontSize: "13px",
        fontWeight: 500
      },
      h5: {
        fontSize: "12px",
        fontWeight: 500
      },
      h6: {
        fontSize: "11px",
        fontWeight: 500,
        lineHeight: 1.5
      }
    },
    MuiLink: {
      root: {
        cursor: "pointer"
      }
    },
    MuiListItemIcon: {
      root: {
        minWidth: "40px"
      }
    },
    MuiListItemText: {
      root: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    },
    MuiListItem: {
      divider: {
        borderBottom: "1px solid #f8f8f8",
        "&:first-child": {
          borderTop: "1px solid #f8f8f8"
        }
      }
    },
    MuiListSubheader: {
      root: {
        lineHeight: "2rem",
        fontSize: "12px"
      },
      sticky: {
        backgroundColor: "#fff",
        lineHeight: 1.5
      }
    },
    MuiAvatar: {
      root: {
        textTransform: "uppercase",
        width: "30px",
        height: "30px"
      }
    },
    MuiBadge: {
      badge: {
        height: "13px",
        minWidth: "13px",
        fontSize: "9px"
      }
    },
    MuiChip: {
      root: {
        height: "20px",
        fontSize: "12px"
      }
    },
    MuiDivider: {
      root: {
        backgroundColor: "rgba(0, 0, 0, 0.07)"
      }
    },
    MuiTable: {
      root: {
        tableLayout: "fixed",
        whiteSpace: "nowrap"
      }
    },
    MuiTableCell: {
      root: {
        fontSize: "12px",
        padding: "15px 20px",
        "& .MuiTypography-body1": {
          fontSize: "12px"
        }
      },
      sizeSmall: {
        padding: "12px 10px",
        "&:last-child": {
          paddingRight: "10px"
        },
        "&.MuiTableCell-paddingCheckbox": {
          padding: "0px 5px"
        },
        "&.MuiTableCell-paddingCheckbox > *": {
          padding: "4px !important"
        }
      },
      paddingCheckbox: {
        width: "31px"
      },
      head: {
        fontSize: "inherit"
      }
    },
    MuiTableHead: {
      root: {
        boxShadow: ShadowsTheme.shadows[2],
        fontSize: "12px",
        "& .MuiTableCell-root": {
          borderBottom: "none"
        }
      }
    },
    MuiTableRow: {
      root: {
        fontSize: "12px",
        "&.Mui-selected": {
          backgroundColor: "rgba(255, 98, 90, 0.04)"
        }
      },
      hover: {
        "&&:hover": {
          backgroundColor: "rgba(255, 98, 90, 0.04)",
          cursor: "pointer"
        }
      }
    },
    MuiTableSortLabel: {
      root: {
        marginLeft: "11px",
        "&:hover": {
          color: "rgba(0, 0, 0, 0.54)"
        },
        "&.MuiTableSortLabel-active": {
          color: "rgba(0, 0, 0, 0.54)",
          "&.MuiTableSortLabel-root.MuiTableSortLabel-active .MuiTableSortLabel-icon.MuiTableSortLabel-icon": {
            color: "rgba(0, 0, 0, 0.54)"
          }
        }
      },
      icon: {
        width: "11px",
        height: "11px",
        marginRight: 0
      }
    },
    MuiGrid: {
      "direction-xs-column": {
        "& .MuiGrid-grid-xs-12": {
          width: "100%"
        }
      }
    },
    MuiSvgIcon: {
      root: {
        width: "20px",
        height: "20px"
      }
    },
    MuiIcon: {
      fontSizeSmall: {
        fontSize: "13px"
      }
    },
    MuiDialogTitle: {
      root: {
        textAlign: "center",
        padding: "24px 35px",
        "& .MuiTypography-root": {
          fontFamily: "SofiaProRegular",
          fontSize: "20px",
          fontWeight: "normal",
          color: ColorTheme.palette.primary.main
        }
      }
    },
    MuiDialogContent: {
      root: {
        padding: "5px 35px"
      }
    },
    MuiDialogActions: {
      root: {
        justifyContent: "center",
        padding: "35px"
      }
    },
    MuiFormLabel: {
      root: {
        fontSize: "12px",
        fontWeight: 500
      }
    },
    MuiFormControlLabel: {
      label: {
        fontSize: "12px"
      }
    },
    MuiSnackbarContent: {
      root: {
        backgroundColor: ColorTheme.palette.navy.main,
        opacity: 0.9
      }
    },
    MuiTooltip: {
      popper: {
        top: "-12px !important"
      }
    }
  }
});

export default Theme;
