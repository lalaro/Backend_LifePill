import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 200,
  duration: '10s',
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8085';

export default function () {
  const res = http.get(`${BASE_URL}/users`);
  check(res, {
    'status es 200': (r) => r.status === 200
  });
  sleep(1);
}