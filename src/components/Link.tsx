import NextLink, { LinkProps } from "next/link";

interface MLinkProps extends LinkProps, React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  isExternal?: boolean;
  children: React.ReactNode;
}

export default function Link({ href, isExternal, children, ...props }: MLinkProps) {
  const Component = isExternal ? "a" : NextLink;

  return (
    <Component
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer noopener" : undefined}
      {...props}
    >
      {children}
    </Component>
  )
}