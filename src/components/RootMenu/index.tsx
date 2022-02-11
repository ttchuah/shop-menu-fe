import * as React from "react";
import { classname } from "../../utils/classname";
import "./style.scss";
// import { ChevronDown, ChevronRight, ChevronUp } from '@bbyca/bbyca-components';

interface MunuItem {
  id: string;
  label: HTMLElement | JSX.Element | string;
  mobileOnly?: boolean;
  content?: (props?: any) => JSX.Element;
}

interface Props {
  menuItems: MunuItem[];
  selected: string;
  select: (item: string) => void;
  isDesktop: boolean;
}

const RootMenu: React.FunctionComponent<Props> = ({
  menuItems,
  selected,
  select,
  isDesktop = false,
}) => {
  return (
    <div className={"RootMenu"}>
      <ul>
        {menuItems
          .filter((menuItem) => !menuItem.mobileOnly)
          .map((menuItem) => {
            const isActive = menuItem.id === selected;
            return (
              <li
                key={menuItem.id}
                className={classname([{ ["active"]: isActive }])}
              >
                <button
                  className="rootMenuBtn"
                  onClick={() =>
                    selected && isActive ? select("") : select(menuItem.id)
                  }
                >
                  {menuItem.label}
                  {isDesktop ? (isActive ? "^" : "\\/") : ">"}
                </button>
                <div
                  className={classname([
                    "flyoutContainer",
                    { ["active"]: isActive },
                  ])}
                >
                  {menuItem.content &&
                    menuItem.content({
                      active: isActive,
                      close: () => select(""),
                    })}
                </div>
              </li>
            );
          })}
      </ul>

      <ul className={"mobileOnly"}>
        {menuItems
          .filter((menuItem) => !!menuItem.mobileOnly)
          .map((menuItem) => {
            return <li key={menuItem.id}>{menuItem.label}</li>;
          })}
      </ul>
    </div>
  );
};

export default RootMenu;
