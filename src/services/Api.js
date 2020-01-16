import axios from 'axios';
import Storage from '../components/storage/Storage';

export const PreloginApi = axios.create({
  baseURL: 'http://uat.bhatbhate.net/api',
  // timeout: 12000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const RegistrationApi = axios.create({
  baseURL: 'http://uat.bhatbhate.net/api',
  // timeout: 12000,
});

export const LoginApi = axios.create({
  baseURL: 'http://uat.bhatbhate.net/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // Authorization:
    //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImVhNjlmNDJlNzdmMDNkNTdkMjY0YTlhMGJjMTQ5NDJjNmYyYmIxMzM4ZjQzNDA2NzJmNTBlNDQ5YmFkNzE4YWUzMzBiMDRkMzJkYTRmMWY3In0.eyJhdWQiOiIxIiwianRpIjoiZWE2OWY0MmU3N2YwM2Q1N2QyNjRhOWEwYmMxNDk0MmM2ZjJiYjEzMzhmNDM0MDY3MmY1MGU0NDliYWQ3MThhZTMzMGIwNGQzMmRhNGYxZjciLCJpYXQiOjE1NTY1MTEwOTAsIm5iZiI6MTU1NjUxMTA5MCwiZXhwIjoxNTg4MTMzNDkwLCJzdWIiOiIxNSIsInNjb3BlcyI6W119.YtNtAxNLpqqnurRzF77vegPUOLdUsVIw57XxXtQXxMqdWnhjg5ktLc9wJYVuhyp0CxkDYgYeo5dv_Ugh0xtZ6rweWsaERSdmauHEaKJRuqqj9T0A1caibzQev82PoBzuQB2gVx40NimE5Uqgzyxcn1yvjagOb4v_V6AiynbDmqzEg1w_ugfyBs2_nwo2EZ24T57XO0pRsR967xMh7u2ivW90bLbhPBuj4-samONgGYsL6AYUwdU-F5MTFF02qJdFHyxMGT8PQ3vrqT2l3nmswav6SGAJZwwq1J1zbROze212WBYRfzBM_7cwaRpRAR8Odb8vLf1tpf3kAOdbnDdO8ScurI_PzEUFlF34NOfeyqism2dSBbcvCJhuqSpfjiS6v4rLcMDNflxdrQwpmGsqd-jG-3Zu5GK_zFAUkqn-UuQkxSHcLOS50AspSH-wehecJhjGiL3ls17paPqRk66C2S0t0qSm_8ABFqYp1XZuhCPYo9TjU3y4cNYTwsaRtCX82mTDB46TmoeASMR3oxRHxWJ8VQBCU6zlKw9XU8i0jp1vliWlGOseDJ13748ISmVyrjdKM1NpoD5x_wgWr9wHo6ijunPoUjS5Ood1ySO2sZlQdOZxi7Xban-cE9O9vbBa8GgnNYLBve55tBSeDkfKCCxTjoaYwlJzeaZSY8m8tEQ"
  },
});
LoginApi.interceptors.request.use(async config => {
  const token = await Storage.getBearertoken();
  console.log('token', token);
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export const SaveVehicleApi = axios.create({
  baseURL: 'http://uat.bhatbhate.net/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
});
SaveVehicleApi.interceptors.request.use(async config => {
  const token = await Storage.getBearertoken();
  console.log('token', token);
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});
