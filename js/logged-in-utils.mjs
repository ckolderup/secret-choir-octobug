import { createAppAuth } from "https://esm.sh/@octokit/auth-app";
import { Octokit } from "https://esm.sh/@octokit/core";

window.octokit = null;

export function authorize() {
  const privateKey = localStorage.getItem("githubPrivateKey");

  if (!!privateKey) {
    try {
      window.octokit = new Octokit({
        authStrategy: createAppAuth,
        auth: {
          appId: localStorage.getItem("githubAppId"),
          privateKey: localStorage.getItem("githubPrivateKey"),
          installationId: localStorage.getItem("githubAppInstallationId"),
        },
      });

      console.log(`done: ${JSON.stringify(octokit)}`);
    } catch (e) {
      console.log(`Error: ${e}`);
      window.octokit = null;
    }
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  authorize();

  const cornerPostLink = document.getElementById("cornerPostLink");
  if (octokit) {
    cornerPostLink.classList.add("showWhenLoggedIn");
  } else {
    cornerPostLink.classList.remove("showWhenLoggedIn");
  }

  const cookieSeconds =
    0 * 24 * 60 * 60 + // days
    0 * 60 * 60 + // hours
    5 * 60 + // minutes
    0; // yeah

  document.cookie = `cookieName=cookieValue; max-age=${cookieSeconds}; path=/`;
});
