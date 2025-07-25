const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="container max-w-screen h-screen border-1 flex items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
