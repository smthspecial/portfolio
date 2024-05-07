import { useLocation } from "react-router-dom";
import { Navigation } from "./Navigation";
import { css, ThemeProvider } from "@emotion/react";
import { colors } from "../constants";
import { useData } from "../hooks/useData";
import { Screen } from "../type";
import { Timeline } from "./Timeline";

export const Layout = () => {
  const { pathname } = useLocation();
  const { data } = useData(pathname as Screen);
  console.log(location);
  return (
    <ThemeProvider theme={{ colors }}>
      <div
        css={css`
          min-height: 100vh;
          padding: 16px;
        `}
      >
        <Navigation />
        <Timeline events={data} />
      </div>
    </ThemeProvider>
  );
};
