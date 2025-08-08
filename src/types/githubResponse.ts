export interface GitHubUserResponse {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string;
  email: string;
  bio: string;
}

export interface GithubUnauthorisedResponse {
  status: string;
  message: string;
  documentation_url?: string;
}
