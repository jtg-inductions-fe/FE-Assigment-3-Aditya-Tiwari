export default async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { username } = await params;

  return <div>No user found named {` ${username}`}</div>;
};
