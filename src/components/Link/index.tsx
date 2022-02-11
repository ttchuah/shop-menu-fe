import * as React from "react";

interface Props {
  className?: string;
  onClick?: (e?: any, internalLinkHandler?: any) => void;
  internalLinkHandler?: (...args: any[]) => void;
  ariaLabel?: string;
  href?: string;
  targetSelf?: boolean;
  external?: boolean;
  rel?: any;
  extraAttributes?: Record<string, any>;
  to?: string;
  params?: string[];
}

const Link: React.FC<Props> = ({
  className,
  onClick,
  internalLinkHandler,
  ariaLabel,
  href,
  targetSelf,
  rel,
  external,
  extraAttributes,
  children,
  to,
  params,
}) => {
  const log = (...args: any[]) => {
    console.log("Log: ", args);
  };
  return (
    <a
      className={className}
      onClick={(e) =>
        onClick ? onClick(e, internalLinkHandler) : log(to, href, params)
      }
      aria-label={ariaLabel}
      href={href}
      target={targetSelf ? "_self" : "_blank"}
      rel={rel || (external ? "external" : "")}
      {...extraAttributes}
    >
      {children}
    </a>
  );
};

export default Link;
