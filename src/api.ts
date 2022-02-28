import axios from "axios";
import { apiUrl } from "@/env";
import {
  IUserProfile,
  IUserProfileUpdate,
  IUserProfileCreate,
  Contest,
  ICreateContest,
  IQuadProblemCreate,
  IQuadProblemPatch
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
// function headers(){
//   return {
//     headers:{
//       'Access-Control-Allow-Origin' : '*',
//       'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
//     }
//   }
// }

export const api = {
  async logInGetToken(username: string, password: string) {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    var data = {
      "username":username,
      "password":password
    }

    return axios.post(`${apiUrl}/api/auth/login/`,data);
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
  async getHomeContests(token:string){
    return axios.get(`${apiUrl}/api/core/contests/`,authHeaders(token));
  },

  async applyForContest(token:string,contest_uuid:string){
    return axios.post(`${apiUrl}/api/core/contests/${contest_uuid}/apply/`,{},authHeaders(token))
  },
  async getRankList(token:string,subject:string|null){
    return axios.get(`${apiUrl}/api/auth/standings/`,authHeaders(token))
  },
  async getQuadrant(token:string){
    return axios.get(`${apiUrl}/api/quadrant/quadregister/`,authHeaders(token))
  },
  async postSOP(token:string,sop:string){
    return axios.post(`${apiUrl}/api/quadrant/quadregister/`,{
      SOP:sop
    },authHeaders(token))
  },
  async getQuadrantContests(token:string,page:number=1){
    return axios.get(`${apiUrl}/api/quadrant/contests/`,{
      params:{
        page:page
      },
      headers: authHeader(token)
    })
  },
  async getQuadrantSelfContests(token:string){
    return axios.get(`${apiUrl}/api/quadrant/self/contests/`,authHeaders(token))
  },
  async getQuadrantContest(token:string,contest_uuid:string){
    return axios.get(`${apiUrl}/api/quadrant/contests/${contest_uuid}/`,authHeaders(token))
    
  },
  async quadContestApply(token:string,contest_uuid:string){
    return axios.post(`${apiUrl}/api/quadrant/contests/${contest_uuid}/apply/`,{},authHeaders(token))
  },
  async getQuadContestProblems(token:string,contest_uuid:string){
    return axios.get(`${apiUrl}/api/quadrant/contests/${contest_uuid}/problems/`,authHeaders(token))

  },
  async createQuadContest(token:string,contest:ICreateContest){
    return axios.post(`${apiUrl}/api/quadrant/contests/`,contest,authHeaders(token))
  },
  async patchQuadrantContest(token:string,contest_uuid:string,contest:ICreateContest){
    return axios.patch(`${apiUrl}/api/quadrant/contests/${contest_uuid}/`,contest,authHeaders(token))
    
  },
  async getQuadContestProblem(token:string,contest_uuid:string,problem_uuid:string){
    return axios.get(`${apiUrl}/api/quadrant/contests/${contest_uuid}/problems/${problem_uuid}`,authHeaders(token))
  },
  async createQuadContestProblem(token:string,contest_uuid:string,problem:IQuadProblemCreate){
    return axios.post(`${apiUrl}/api/quadrant/contests/${contest_uuid}/problems/`,problem,authHeaders(token))

  },
  async patchQuadContestProblem(token:string,contest_uuid:string,problem_uuid:string,contest:IQuadProblemPatch){
    return axios.patch(`${apiUrl}/api/quadrant/contests/${contest_uuid}/problems/${problem_uuid}`,contest,authHeaders(token))
  },
  async deleteQuadContestProblem(token:string,contest_uuid:string,problem_uuid:string){
    return axios.delete(`${apiUrl}/api/quadrant/contests/${contest_uuid}/problems/${problem_uuid}`,authHeaders(token))
  },

};
