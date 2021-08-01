import React from "react";
import * as MUI from "@material-ui/core";
import Icon from "@mdi/react";
import { mdiChevronDown } from "@mdi/js";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  popper: (props: any) => ({
    zIndex: 1300,
    top: props.navBar
  }),
  chevronIcon: (props: any) => ({
    marginLeft: theme.spacing(0.4),
    "& svg": {
      fill: props.iconColor
    }
  })
}));

const DropDownMenu = (props: any) => {
  const { children, chevronDownIcon, navBar } = props;

  const classes = useStyles({
    iconColor: chevronDownIcon,
    navBar: navBar ? "10px !important" : 0
  });
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleToggle = (event: any) => {
    setAnchorEl(event.currentTarget ? event.currentTarget : null);
  };

  const getComponent = (key: any) => {
    const component = React.Children.map(children, child => {
      if (child.key === key) {
        if (key === "anchor") {
          return React.cloneElement(child, {
            onClick: handleToggle
          });
        }
        return child;
      }
    });
    return component;
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {!!chevronDownIcon ? (
        <MUI.IconButton
          size="small"
          className={classes.chevronIcon}
          onClick={handleToggle}
        >
          <Icon path={mdiChevronDown} size="12px" />
        </MUI.IconButton>
      ) : (
        getComponent("anchor")
      )}
      <MUI.Popover
        className={classes.popper}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <MUI.Paper id="menu-list-grow">{getComponent("popper")}</MUI.Paper>
      </MUI.Popover>
    </>
  );
};

export default DropDownMenu;
