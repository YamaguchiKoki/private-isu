import http from "k6/http";

import { sleep } from "k6"

import { url } from "./config.ts"

export default function() {
  http.get(url("/initialized"), {
    timeout: "10s",
  });

  sleep(1)
}
