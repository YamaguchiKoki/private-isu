import comment from "./comment.ts";
import initialize from "./initialize.ts";


export {
  initialize,
  comment,
}

export const options = {
  scenarios: {
    initialize: {
      executor: "shared-iterations",
      vus: 1,
      iterations: 1,
      exec: "initialize",
      maxDuration: "10s",
    },
    comment: {
      executor: "constant-vus",
      vus: 4,
      duration: "30s",
      exec: "comment",
      startTime: "12s",
    }
  }
}
export default function() {}
