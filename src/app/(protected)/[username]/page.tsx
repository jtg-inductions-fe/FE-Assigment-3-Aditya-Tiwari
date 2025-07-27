// TODO: Create User profile Page

import { logout } from "@/app/(auth)/login/actions";
import { Button } from "@/components/ui/button";

const Profile = () => {
  return (
    <>
      <div>Hello User</div>
      <Button onClick={logout}>Logout</Button>
    </>
  );
};

export default Profile;
