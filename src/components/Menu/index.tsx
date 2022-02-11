import classname from "classnames";
import React, { FC, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Category, CategoryGroup } from "../../models";
import "./style.scss";

export interface MenuProps {
  items: CategoryGroup[] | Category[];
  isL1?: boolean;

  heading?: string;

  // is this menu currently visible
  active?: boolean;

  // what happens when you click the Go Back button
  close?: () => void;
}

function isCategoryGroup(
  toBeDetermined: CategoryGroup | Category
): toBeDetermined is CategoryGroup {
  if ("groupTitle" in toBeDetermined) {
    return true;
  } else {
    return false;
  }
}

const Menu: FC<MenuProps> = ({
  items,
  isL1 = true,
  heading = "",
  active,
  close,
}) => {
  const [selectedItem, setSelectedItem] = useState("");

  // If this menu is no longer active (i.e. no longer needs to be shown), then
  // deselect all menu items.  (So that the next time menu becomes visible, it's
  // back in its original state with no selected menu items)
  useEffect(() => {
    if (!active) {
      setSelectedItem("");
    }
  }, [active]);

  // Handle click of "go back" button.
  const onClose = (): void => {
    setSelectedItem("");
  };

  const onClickShopAll = (): void => {
    console.log("");
  };

  const onSelectCategory = (category: Category) => {
    // Activate this menu item if it was inactive prior to being selected.
    // Otherwise deactivate this menu item it was active prior to being selected.
    // (This will cause the submenu to collapse)
    if (category.childItems) {
      const isCategorySelected = category.ctaText === selectedItem;
      setSelectedItem(isCategorySelected ? "" : category.ctaText);
    } else {
      alert("go to PLP");
    }
  };

  // Render out a single category.
  const renderCategory = (category: Category): JSX.Element => {
    const isCategorySelected = category.ctaText === selectedItem;
    return (
      <React.Fragment>
        <div>
          <button
            className={classname("menu-link", {
              "menu-link--active": isCategorySelected,
            })}
            onClick={(e) => {
              e.stopPropagation();
              onSelectCategory(category);
            }}
          >
            {category.ctaText}
          </button>
        </div>
        {category.childItems && (
          <Menu
            active={isCategorySelected}
            heading={category.ctaText}
            items={category.childItems}
            isL1={false}
            close={onClose}
          />
        )}
      </React.Fragment>
    );
  };

  let cssClass = "";
  if (isL1) {
    cssClass = classname(
      "menu",
      { "menu--child-active": !!selectedItem },
      {
        "menu--hidden": !active,
      }
    );
  } else {
    cssClass = classname(
      "menu-inner",
      { "menu-inner--active": active },
      {
        "menu-inner--child-active": !!selectedItem,
      }
    );
  }
  const isDesktop = useMediaQuery({
    query: "(min-width: 1025px)",
  });

  return (
    <div className={cssClass}>
      {heading && <h2>{heading}</h2>}
      {!isL1 && (
        <button
          className="ShopAllBtn"
          onClick={(e) => {
            e.stopPropagation();
            onClickShopAll();
          }}
        >
          Shop All
        </button>
      )}
      {!isDesktop && (
        <button
          className="BackBtn"
          onClick={(e) => {
            e.stopPropagation();
            close?.();
          }}
        >
          &lt; Back
        </button>
      )}
      {items.map((item: CategoryGroup | Category) => {
        return (
          <React.Fragment>
            {isCategoryGroup(item) && (
              <React.Fragment>
                <h2>{item.groupTitle}</h2>

                {
                  // Print out the list of categories for this group.
                  item.childItems?.map((category: Category) =>
                    renderCategory(category)
                  )
                }
              </React.Fragment>
            )}
            {!isCategoryGroup(item) && renderCategory(item)}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Menu;
