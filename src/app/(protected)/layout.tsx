// TODO: Create Main page layout including header and content

import { ReactNode } from "react";

const MainLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <div>
      <header>Header</header>
      {children}
    </div>
  );
};

export default MainLayout;
