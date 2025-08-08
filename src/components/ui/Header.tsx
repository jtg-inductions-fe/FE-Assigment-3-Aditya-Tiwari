import { PropsWithChildren } from "react";

const Header = ({ children }: PropsWithChildren) => {
  return <header className="w-full border-b-1 p-2 flex">{children}</header>;
};

export { Header };
