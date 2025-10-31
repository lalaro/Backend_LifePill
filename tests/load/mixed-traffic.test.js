import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 50,
  duration: '40s',
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8085';
const routes = [
  '/users',
  '/notifications',
  '/meals'
];

export default function () {
  const route = routes[Math.floor(Math.random() * routes.length)];
  const res = http.get(`${BASE_URL}${route}`);
  check(res, { 'status is 200': r => r.status === 200 });
  sleep(1);
}