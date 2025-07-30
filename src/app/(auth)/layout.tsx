// TODO: Add authentication page layout
import { ReactNode } from "react";

const AuthLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <div className="container max-w-dvw h-dvh flex items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
