import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 50,
  duration: "20s",
};

const BASE_URL = __ENV.BASE_URL || "http://localhost:8085";

export default function () {
  // 🧩 Incluir userId requerido por el modelo
  const payload = JSON.stringify({
    userId: `user-${__VU}`,           // o cualquier ID válido en tu sistema
    message: `Notificación ${__VU}-${__ITER}`,
  });

  const params = {
    headers: { "Content-Type": "application/json" },
  };

  const res = http.post(`${BASE_URL}/notifications`, payload, params);

  console.log(`Status ${res.status}: ${res.body}`);

  check(res, {
    "status 201": (r) => r.status === 201
  });

  sleep(1);
}