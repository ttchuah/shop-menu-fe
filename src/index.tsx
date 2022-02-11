import * as React from "react";
import { render } from "react-dom";
import { useMediaQuery } from "react-responsive";

// import Link from "./components/Link";
import Link from './components/Link'
import Menu from "./components/Menu";

import classname from "classnames";
import Hamburger from "./components/Hamburger";
import RootMenu from "./components/RootMenu";
import { CategoryGroup } from "./models";
import "./style.scss";

const groups: CategoryGroup[] = [
  {
    groupTitle: "What's Popular",
    childItems: [
      {
        ctaText: "Top Deals",
        eventType: "category",
        eventId: "11962778",
        seoText: "top-deals",
        childItems: [
          {
            ctaText: "Laptops on sale",
            eventType: "category",
            eventId: "11962778",
            seoText: "laptops-on-sale",
            childItems: [],
          },
        ],
      },
    ],
  },
  {
    groupTitle: "Shop By Category",
    childItems: [
      {
        ctaText: "Computers And Tablets",
        eventType: "category",
        eventId: "11962778",
        seoText: "computers-tablets",
        childItems: [
          {
            ctaText: "Laptops & Macbboks",
            eventType: "category",
            eventId: "11962778",
            seoText: "laptops-macbooks",
            childItems: [
              {
                ctaText: "Macbook Pro",
                eventType: "category",
                eventId: "11962778",
                seoText: "macbook-pro",
              },
            ],
          },
        ],
      },
      {
        ctaText: "Computers Accessories",
        eventType: "category",
        eventId: "11962778",
        seoText: "computers-accessories",
        childItems: [
          // ...
        ],
      },
    ],
  },
];

const rootMenu = [
  {
    content: (props: any) => <Menu {...props} items={groups} />,
    id: "shop",
    label: (
      <span data-automation="x-shop">
        {/* {intl.formatMessage({ id: messages.shopHeading.id })} */}
        Shop
      </span>
    ),
  },
  {
    content: (props: any) => <Menu {...props} items={groups} />,
    id: "brands",
    label: (
      <span data-automation="x-brands">
        {/* {intl.formatMessage({ id: messages.brandsHeading.id })} */}
        Brand
      </span>
    ),
  },
  {
    id: "deals",
    label: (
      <span data-automation="x-deals">
        {/* {intl.formatMessage({ id: messages.dealsHeading.id })} */}
        Deals
      </span>
    ),
    content: (props: any) => <Menu {...props} items={groups} />,
  },
  {
    id: "services",
    label: <span data-automation="x-deals">Services</span>,
    content: (props: any) => <Menu {...props} items={groups} />,
  },
  {
    id: "order-status",
    label: (
      <Link
        href={`/orders`}
        external
        targetSelf
        onClick={(e) => {
          // eventToSessionStorage('Order Status');
        }}
        className={"noIcon"}
      >
        <span data-automation="x-order-status">
          {/* {intl.formatMessage({
            id: messages.orderStatus.id,
          })} */}
          Orders
        </span>
      </Link>
    ),
    mobileOnly: true,
  },
  {
    id: "blog",
    label: (
      <Link
        external
        // href={intl.formatMessage({
        //   ...messages.blogHref,
        // })}
        href={"http://blog.bestbuy.ca"}
        key="blog"
        className={"noIcon"}
      >
        <span data-automation="x-blog">
          {/* {intl.formatMessage({
            id: messages.blogText.id,
          })} */}
          Blog
        </span>
      </Link>
    ),
    mobileOnly: true,
  },
  {
    id: "bbyForBusiness",
    label: (
      <Link
        to="bbyForBusiness"
        params={["test"]}
        external={false}
        onClick={(e) => {
          // props.onServicesClick(); ??
        }}
        targetSelf={false}
        className={"noIcon"}
      >
        <span data-automation="x-bby-business">
          {/* {intl.formatMessage({
            id: messages.bbyForBusiness.id,
          })} */}
          Best Buy Business
        </span>
      </Link>
    ),
    mobileOnly: true,
  },
];

const App: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const [selectedItem, selectItem] = React.useState<string>("");
  const [rootMenuState, setRootMenuState] = React.useState(false);

  // a substitute for redux-responsive
  const isDesktop = useMediaQuery({
    query: "(min-width: 1025px)",
  });

  return (
    <React.Fragment>
      <div className="main">
        {/* Drawer */}
        <Hamburger onClick={() => setRootMenuState(!rootMenuState)} />
        <div
          // className={classname([styles.MenuWrapper, { [styles.open]: this.state.open }])}
          className={classname(["MenuWrapper", { ["open"]: rootMenuState }])}
        >
          <RootMenu
            menuItems={rootMenu}
            selected={selectedItem}
            select={selectItem}
            isDesktop={isDesktop}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

render(<App />, document.getElementById("root"));
