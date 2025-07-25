export default async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { username } = await params;

  return <div>{`This is ${username}'s profile`}</div>;
};
