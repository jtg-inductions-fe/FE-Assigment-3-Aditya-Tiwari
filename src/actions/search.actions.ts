"use server";

import { GITHUB_API } from "@/constants/routes";
import { fetchData } from "@/utils/fetchData";

const fetchUsers = async () => {
  "use server";
  const response = await fetchData({ resource: GITHUB_API.ROUTES.USERS });
  return response.responseData;
};

export { fetchUsers };
