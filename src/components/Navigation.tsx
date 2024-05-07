import { css } from "@emotion/react";
import { NavLink } from "react-router-dom";

const styles = css`
  padding: 4px 8px;
  &.active {
    font-weight: bold;
    color: red;
  }
`;

export const Navigation = () => {
  return (
    <nav>
      <ul
        css={css`
          display: flex;
          flex-basis: 50%;
          justify-content: center;
        `}
      >
        <li>
          <NavLink css={styles} to={`/past`}>
            Past projects
          </NavLink>
        </li>
        <li>
          <NavLink css={styles} to={`/present`}>
            Current skills
          </NavLink>
        </li>
        <li>
          <NavLink css={styles} to={`/future`}>
            Future plans
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
