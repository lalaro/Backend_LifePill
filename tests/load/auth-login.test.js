import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 100,               // usuarios simultáneos
  duration: '30s',        // duración
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8085';

export default function () {
  // Cambia los credenciales si es necesario
  const payload = JSON.stringify({
    email: 'demo@example.com',
    password: '123456'
  });

  const params = { headers: { 'Content-Type': 'application/json' } };

  const res = http.post(`${BASE_URL}/api/auth/login`, payload, params);

  check(res, {
    'status 200': r => r.status === 200,
    'contains token': r => r.json('token') !== undefined,
  });

  sleep(1);
}