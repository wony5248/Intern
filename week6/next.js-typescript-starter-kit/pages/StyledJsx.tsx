import * as React from "react";
import { Layout } from "../src/components/Layout";

export default props => (
  <Layout>
    <div>
      {/*language=PostCSS*/}
      <style>
        {`
          * {
            color: darkred;
          }
        `}
      </style>
      StyledJsx
    </div>
  </Layout>
);
