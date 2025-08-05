"use server";

import { fetchData } from "@/utils/fetchData";

const fetchUsers = async () => {
  "use server";
  const response = await fetchData({ resource: "/users" });
  return response.responseData;
};

export { fetchUsers };
