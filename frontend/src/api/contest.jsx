import { get, post } from "./index";

export const fetchContest = () => get(`/contests`);

export const fetchContestById = (contestId) => get(`/contest/${contestId}`);

