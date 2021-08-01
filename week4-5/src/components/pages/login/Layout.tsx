import React from "react";
import * as MUI from "@material-ui/core";

import LoginForm from "./LoginForm";
// import ReconfirmDialog from '../../elements/ReconfirmDialog'
interface LayoutProps {
  mode: any;
}
const Layout = (props: any) => {
  const { mode } = props;

  // const [isOpen, setIsOpen] = React.useState(false)

  // React.useEffect(() => {
  //   const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)
  //   if (!isChrome) {
  //     setIsOpen(true)
  //   }
  // }, [])

  // const handleClickOk = () => {
  //   setIsOpen(false)
  // }

  return (
    <MUI.Box mt="140px" mb="140px">
      <LoginForm mode={mode} />
      {/* <ReconfirmDialog
        title={'This site is best viewed on Google Chrome'}
        isDialogOpen={isOpen}
        confirmButtonMessage={'Ok, understood'}
        onClickConfirm={handleClickOk}
        hasCancelButton={false}
      /> */}
    </MUI.Box>
  );
};

export default Layout;
