import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...props }, forwardRef) => {
  return (
    <button
      ref={forwardRef}
      className="px-2.5 py-2 leading-none transition border rounded-sm border-mcqueen hover:bg-mcqueen hover:text-white"
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";
export default Button;