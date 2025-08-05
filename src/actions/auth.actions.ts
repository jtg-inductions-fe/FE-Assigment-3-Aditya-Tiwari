'use server'

<<<<<<< HEAD:src/actions/authActions.ts
import { createLoginSession, clearLoginSession } from '@/utils/loginSession'
import { redirect } from 'next/navigation'
import { GITHUB_API, ROUTES } from '@/constants/routes'
import { LoginFormValues } from '@/containers/auth'
import { fetchData } from '@/utils/fetchData'
import { ActionResult } from './actions.types'
import { GithubUnauthorisedResponse, GitHubUserResponse } from '@/types/githubResponse'
=======
import { createLoginSession, clearLoginSession } from "@/utils/loginSession";
import { redirect } from "next/navigation";
import { GITHUB_API, ROUTES } from "@/constants/routes";
import { LoginFormValues } from "@/containers/auth/LoginForm.schema";
import { fetchData } from "@/utils/fetchData";
import { ActionResult } from "./actions.types";
import {
  GithubUnauthorisedResponse,
  GitHubUserResponse,
} from "@/types/githubResponse";
>>>>>>> 20a9f6b ([AT-A3-03]:Search bar with autocomplete functionality):src/actions/auth.actions.ts

type LoginErrors = {
  accessToken: string[]
}

type LogoutErrors = {
  message: string[]
}

type LoginResult = ActionResult<LoginErrors>

const login = async (values: LoginFormValues): Promise<LoginResult> => {
  const accessToken = values.accessToken?.trim()

  if (!accessToken) {
    return {
      success: false,
      errors: {
        accessToken: ['Access token is required.'],
      },
    }
  }

<<<<<<< HEAD:src/actions/authActions.ts
  let userName: string | undefined
  let responseData: GitHubUserResponse | GithubUnauthorisedResponse
=======
  let userName: string | undefined;
  let responseData:
    | GitHubUserResponse
    | GithubUnauthorisedResponse
    | GitHubUserResponse[];
>>>>>>> 20a9f6b ([AT-A3-03]:Search bar with autocomplete functionality):src/actions/auth.actions.ts

  try {
    const result = await fetchData<GitHubUserResponse>({
      resource: GITHUB_API.ROUTES.USER,
      accessToken,
    })
    responseData = result.responseData
    userName = result.userName

    if (('status' in responseData && responseData.status === '401') || !userName) {
      return {
        success: false,
        errors: {
          accessToken: ['Invalid or expired token. Please try again.'],
        },
      }
    }

    await createLoginSession(accessToken)
  } catch {
    return {
      success: false,
      errors: {
        accessToken: ['Unexpected error occurred. Please try again later.'],
      },
    }
  }

  redirect(`/${userName}`)
}

const logout = async (): Promise<ActionResult<LogoutErrors>> => {
  try {
    await clearLoginSession()
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, errors: { message: [err.message] } }
    }

    return {
      success: false,
      errors: { message: ['Unexpected error occurred'] },
    }
  }
  redirect(ROUTES.LOGIN)
}

export { login, logout }
