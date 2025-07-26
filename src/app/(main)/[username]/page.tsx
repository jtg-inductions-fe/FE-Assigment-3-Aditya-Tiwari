// TODO: Create User profile Page

import { Button } from "@/components/ui/button";

const Profile = async ({
  params,
}: Readonly<{
  params: Promise<{ username: string }>;
}>) => {
  const { username } = await params;

  return <div>{`This is ${username}'s profile`}</div>;
};

export default Profile;
