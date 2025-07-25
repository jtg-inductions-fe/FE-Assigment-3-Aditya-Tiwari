const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header>Header</header>
      {children}
    </div>
  );
};

export default MainLayout;
