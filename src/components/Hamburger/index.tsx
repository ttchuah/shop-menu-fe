// import { Button, Menu } from "@bbyca/bbyca-components";
import * as React from "react";
// import * as styles from "./style.css";
import "./style.scss";

interface Props {
  onClick: () => void;
  label?: string;
  className?: string;
}

export const Hamburger = (props: Props) => (
  <button
    className={`Hamburger ${props?.className || ""}`}
    onClick={props.onClick}
    aria-label={props.label}
  >
    <div className="drawerMenuLabel">{props.label}</div>
    {/* <Menu className={styles.drawerMenuIcon} color="white" viewBox="4 4 24 24" /> */}
    Menu
  </button>
);

export default Hamburger;
