import * as React from "react";
import LinkNext from "next/link";

import { cn } from "@/lib/utils";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, href, children, ...props }, ref) => {
    return (
      <LinkNext
        href={href}
        className={cn(
          "text-sm font-medium underline-offset-4 transition-colors hover:underline",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </LinkNext>
    );
  }
);
Link.displayName = "Link";

export { Link };
