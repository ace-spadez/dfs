import axios from "axios";
import { apiUrl } from "@/env";
import {
  IUserProfile,
  IUserProfileUpdate,
  IUserProfileCreate,
  Contest,
  ICreateContest,
  IQuadProblemCreate,
  IQuadProblemPatch,
  IPatchSelf,
  ISubmission
} from "./interfaces";

function authHeaders(token: string) {
  return {
    headers: {
      Authorization: `Token ${token}`,
    },
  };
}
function authHeader(token: string) {
  return {
    Authorization: `Token ${token}`

  };
}


export const api = {
  async logInGetToken(username: string, password: string) {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    var data = {
      "username": username,
      "password": password
    }

    return axios.post(`${apiUrl}/api/auth/login/`, data);
  },
  async verify(key: string) {

    return axios.get(`${apiUrl}/api/auth/verify/${key}`);
  },
  async getMe(token: string) {
    console.log(token)
    return axios.get<IUserProfile>(
      `${apiUrl}/api/auth/self/`,
      authHeaders(token)
    );
  },
  async updateMe(token: string, data: IUserProfileUpdate) {
    return axios.put<IUserProfile>(
      `${apiUrl}/api/v1/users/me`,
      data,
      authHeaders(token)
    );
  },
  async getUsers(token: string) {
    return axios.get<IUserProfile[]>(
      `${apiUrl}/api/v1/users/`,
      authHeaders(token)
    );
  },
  async updateUser(token: string, userId: number, data: IUserProfileUpdate) {
    return axios.put(
      `${apiUrl}/api/v1/users/${userId}`,
      data,
      authHeaders(token)
    );
  },
  async createUser(token: string, data: IUserProfileCreate) {
    return axios.post(`${apiUrl}/api/v1/users/`, data, authHeaders(token));
  },
  async passwordRecovery(email: string) {
    return axios.post(`${apiUrl}/api/v1/password-recovery/${email}`);
  },
  async resetPassword(password: string, token: string) {
    return axios.post(`${apiUrl}/api/v1/reset-password/`, {
      new_password: password,
      token,
    });
  },
  async register(password: string, email: string, username: string) {
    console.log(apiUrl)
    return axios.post(`${apiUrl}/api/auth/register/`, {
      password,
      email,
      username,
    });
  },
  async getUser(token: string, username: string) {
    // await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));
	console.log(token);
	console.log("WOLOLO");
    return axios.get(`${apiUrl}/api/auth/users/${username}/`, authHeaders(token))
  },
  async getRankingHistory(token: string, username: string) {
    // await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));

    return axios.get(`${apiUrl}/api/auth/users/${username}/ratings/`, authHeaders(token))

  },
  async patchSelf(token: string, user: IPatchSelf) {
    // await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));

    const formData = new FormData();
    if (user.profile)
      formData.append('profile_image', user.profile)
    if (user.bio)
      formData.append('bio', user.bio)
    return axios.post(`${apiUrl}/api/auth/self/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Token ${token}`

      }
    })
  },
  async watchToggle(token: string, username: string, value: boolean) {
    return axios.post(`${apiUrl}/api/auth/friends/${username}/`, { value: value }, authHeaders(token))
  },
  async getHomeContests(token: string) {
    // await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));

    return axios.get(`${apiUrl}/api/core/contests/`, authHeaders(token));
  },
  async getContestPageContests(token: string, page_num: number) {
    // await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));

    return axios.get(`${apiUrl}/api/core/contests/`, {
      params: {
        page: page_num

      },
      headers: authHeader(token)
    });
  },
  async applyForContest(token: string, contest_uuid: string) {
    // await new Promise((resolve, reject) => setTimeout(() => resolve(), 5000));

    return axios.post(`${apiUrl}/api/core/contests/${contest_uuid}/apply/`, {}, authHeaders(token))
  },
  async getRankList(token: string, subject: string | null) {
    // await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));

    return axios.get(`${apiUrl}/api/auth/standings/`, authHeaders(token))
  },
  async getQuadrant(token: string) {
    return axios.get(`${apiUrl}/api/quadrant/quadregister/`, authHeaders(token))
  },
  async postSOP(token: string, sop: string) {
    return axios.post(`${apiUrl}/api/quadrant/quadregister/`, {
      SOP: sop
    }, authHeaders(token))
  },
  async getQuadrantContests(token: string, page: number = 1) {
    return axios.get(`${apiUrl}/api/quadrant/contests/`, {
      params: {
        page: page
      },
      headers: authHeader(token)
    })
  },
  async getQuadrantSelfContests(token: string) {
    return axios.get(`${apiUrl}/api/quadrant/self/contests/`, authHeaders(token))
  },
  async getQuadrantContest(token: string, contest_uuid: string) {
    return axios.get(`${apiUrl}/api/quadrant/contests/${contest_uuid}/`, authHeaders(token))

  },
  async quadContestApply(token: string, contest_uuid: string) {
    return axios.post(`${apiUrl}/api/quadrant/contests/${contest_uuid}/apply/`, {}, authHeaders(token))
  },
  async getQuadContestProblems(token: string, contest_uuid: string) {
    return axios.get(`${apiUrl}/api/quadrant/contests/${contest_uuid}/problems/`, authHeaders(token))

  },
  async createQuadContest(token: string, contest: ICreateContest) {
    return axios.post(`${apiUrl}/api/quadrant/contests/`, contest, authHeaders(token))
  },
  async patchQuadrantContest(token: string, contest_uuid: string, contest: ICreateContest) {
    return axios.patch(`${apiUrl}/api/quadrant/contests/${contest_uuid}/`, contest, authHeaders(token))

  },
  async getQuadContestProblem(token: string, contest_uuid: string, problem_uuid: string) {
    return axios.get(`${apiUrl}/api/quadrant/contests/${contest_uuid}/problems/${problem_uuid}`, authHeaders(token))
  },
  async createQuadContestProblem(token: string, contest_uuid: string, problem: IQuadProblemCreate) {
    return axios.post(`${apiUrl}/api/quadrant/contests/${contest_uuid}/problems/`, problem, authHeaders(token))

  },
  async patchQuadContestProblem(token: string, contest_uuid: string, problem_uuid: string, problem: IQuadProblemPatch) {
    return axios.patch(`${apiUrl}/api/quadrant/contests/${contest_uuid}/problems/${problem_uuid}/`, problem, authHeaders(token))
  },
  async deleteQuadContestProblem(token: string, contest_uuid: string, problem_uuid: string) {
    return axios.delete(`${apiUrl}/api/quadrant/contests/${contest_uuid}/problems/${problem_uuid}/`, authHeaders(token))
  },
  async getContest(token: string, contest_uuid: string) {
    // await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));

    return axios.get(`${apiUrl}/api/core/contests/${contest_uuid}/`, authHeaders(token))
  },
  async getContestStandings(token: string, contest_uuid: string, page: number) {
    // await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));

    return axios.get(`${apiUrl}/api/core/contests/${contest_uuid}/standings/`, {
      params: {
        page: page,

      },
      headers: authHeader(token)
    })
  },
  async getContestFriendsStandings(token: string, contest_uuid: string, page: number) {
    // await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));

    return axios.get(`${apiUrl}/api/core/contests/${contest_uuid}/friendsstandings/`, {
      headers: authHeader(token)
    })
  },
  async getContestProblems(token: string, contest_uuid: string) {
    // await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));
    
    return axios.get(`${apiUrl}/api/core/contests/${contest_uuid}/problems/`, authHeaders(token))
  },
  async getContestSubmissions(token: string, contest_uuid: string) {
    // await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));
    
    return axios.get(`${apiUrl}/api/core/contests/${contest_uuid}/submissions/`, authHeaders(token))
  },
  async postContestProblemAnswer(token: string, contest_uuid: string, problem_uuid: string, submission: ISubmission) {
    return axios.post(`${apiUrl}/api/core/contests/${contest_uuid}/problems/${problem_uuid}/answer/`, submission, authHeaders(token))
  },
  async postBeginAttempt(token: string, contest_uuid: string) {
    // await new Promise((resolve, reject) => setTimeout(() => resolve(), 5000));
//
    return axios.post(`${apiUrl}/api/core/contests/${contest_uuid}/attempt/`, {}, authHeaders(token))
  },
};
