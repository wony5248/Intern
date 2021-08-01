import React from "react";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import * as MUI from "@material-ui/core";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import classNames from "classnames";

export const breakpoints = {
  values: {
    xl: 1192,
    /** Between 1024 and  1191 */
    lg: 1024,
    /** Between 900 and 1023 */
    md: 900,
    /** Between 768 and  899 */
    sm: 768,
    /** Below 767 */
    xs: 767
  }
};

const useStyles = makeStyles(theme => ({
  buttonMargin: {
    margin: theme.spacing(0.5)
  },
  currentPageText: {
    minWidth: "30px",
    textAlign: "center",
    cursor: "pointer"
  },
  pageInput: {
    fontSize: "11px",
    fontWeight: 500,
    margin: theme.spacing(0.5),
    "& .MuiInputBase-input": {
      textAlign: "center",
      width: "30px",
      padding: 0
    }
  }
}));

const TablePaginationActions = (props: any) => {
  const theme = useTheme();
  const classes = useStyles();
  const { count, page, rowsPerPage, onChangePage }: any = props;

  const [isEditable, setIsEditable] = React.useState(false);
  const [inputPage, setInputPage] = React.useState(1);

  const maxPage = Math.ceil(count / rowsPerPage);

  React.useEffect(() => {
    setInputPage(page + 1);
    // eslint-disable-next-line
  }, []);

  const handleFirstPageButtonClick = (event: any) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event: any) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event: any) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event: any) => {
    onChangePage(event, Math.max(0, maxPage - 1));
  };

  const handleChangePageInput = (event: any) => {
    setInputPage(event.target.value);
  };

  const handleConfirmPageInput = (event: any) => {
    if (
      isNaN(inputPage) ||
      inputPage < 1 ||
      inputPage > maxPage ||
      inputPage === page + 1
    ) {
      setInputPage(page + 1);
      setIsEditable(false);
      return;
    }
    setIsEditable(false);
    onChangePage(event, inputPage - 1);
  };

  const handleKeyDownPageInput = (event: any) => {
    if (event.key === "Enter") {
      handleConfirmPageInput(event);
    }
  };

  return (
    <React.Fragment>
      <MUI.Typography className={classes.buttonMargin}>1</MUI.Typography>
      <MUI.IconButton
        className={classes.buttonMargin}
        size="small"
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </MUI.IconButton>
      <MUI.IconButton
        className={classes.buttonMargin}
        size="small"
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </MUI.IconButton>
      {isEditable ? (
        <MUI.InputBase
          className={classes.pageInput}
          autoFocus
          value={inputPage}
          onChange={handleChangePageInput}
          onBlur={handleConfirmPageInput}
          onKeyPress={handleKeyDownPageInput}
        />
      ) : (
        <MUI.Typography
          className={classNames(classes.currentPageText, classes.buttonMargin)}
          variant="h6"
          color="textPrimary"
          onClick={() => setIsEditable(true)}
        >
          {page + 1}
        </MUI.Typography>
      )}
      <MUI.IconButton
        className={classes.buttonMargin}
        size="small"
        onClick={handleNextButtonClick}
        disabled={page >= maxPage - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </MUI.IconButton>
      <MUI.IconButton
        className={classes.buttonMargin}
        size="small"
        onClick={handleLastPageButtonClick}
        disabled={page >= maxPage - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </MUI.IconButton>
      <MUI.Typography className={classes.buttonMargin}>
        {maxPage}
      </MUI.Typography>
    </React.Fragment>
  );
};

export default TablePaginationActions;
