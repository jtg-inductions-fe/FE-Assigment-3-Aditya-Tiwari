// TODO: Add authentication page layout
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

const AuthLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <div className="container max-w-dvw h-dvh flex items-center justify-center">
      {children}
      <Toaster position="top-right" />
    </div>
  );
};

export default AuthLayout;
