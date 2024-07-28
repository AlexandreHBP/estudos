import axios from 'axios';

const API_URL = 'http://localhost:3000/times'; 

export const getTeams = () => axios.get(API_URL);
export const createTeam = (team) => axios.post(API_URL, team);
export const updateTeam = (id, team) => axios.put(`${API_URL}/${id}`, team);
export const deleteTeam = (id) => axios.delete(`${API_URL}/${id}`);
