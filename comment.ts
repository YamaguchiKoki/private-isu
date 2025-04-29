import { url } from "./config.ts"
import http from "k6/http";

import { parseHTML } from "k6/html";
import { check } from "k6";
import { getAccount } from "./accounts.ts";

export default function() {
  const account = getAccount();

  const login_res = http.post(url("/login"), {
    account_name: account.account_name,
    password: account.password,
  });

  check(login_res, {
    "status was 200": (res) => res.status === 200,
  });

  const res = http.get(url("/@terra"));

  const doc = parseHTML(res.body as string);

  const token = doc.find("input[name='csrf_token']").first().attr("value");
  const post_id = doc.find("input[name='post_id']").first().attr("value");

  const comment_res = http.post(url("/comment"), {
    csrf_token: token as string,
    post_id: post_id as string,
    comment: 'Hello k6',
  });

  check(comment_res, {
    "status was 200": (res) => res.status === 200,
  });
}
