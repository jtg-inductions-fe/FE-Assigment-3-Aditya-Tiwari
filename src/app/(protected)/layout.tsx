// TODO: Create Main page layout including header and content

import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/Header";
import { Logo } from "@/components/ui/Logo";
import { ReactNode } from "react";
import { logout } from "@/actions/auth.actions";
import { Autocomplete } from "@/containers/search/Autocomplete";

const MainLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <div>
      <Header>
        <div className="flex flex-1 gap-2">
          <Logo imageSrc="/images/Logo.png" imageDesc="Github profile viewer" />
          <Autocomplete />
        </div>
        <div className="flex flex-1 justify-end">
          <Button onClick={logout}>Logout</Button>
        </div>
      </Header>
      {children}
    </div>
  );
};

export default MainLayout;
