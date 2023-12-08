import { Octokit } from "@octokit/rest";
import { createAppAuth } from "@octokit/auth-app";
import { WORKFLOW_OWNER, WORKFLOW_REPO, WORKFLOW_ID, WORKFLOW_REF } from "./constants";

type triggerWorkflowDispatchParams = {
  appId: string;
  secretKey: string;
  installationId: string;
};

export const triggerWorkflowDispatch = async ({
  appId,
  secretKey,
  installationId
}: triggerWorkflowDispatchParams): Promise<void> => {

  const octokit = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: appId,
      privateKey: secretKey,
      installationId: installationId,
    },
  });

  await octokit.rest.actions
    .createWorkflowDispatch({
      owner: WORKFLOW_OWNER,
      repo: WORKFLOW_REPO,
      workflow_id: WORKFLOW_ID,
      ref: WORKFLOW_REF,
    })
    .then((_) => {
      console.log(
        `success: ${WORKFLOW_OWNER}/${WORKFLOW_REPO}/${WORKFLOW_ID}:${WORKFLOW_REF} workflow_dispatch`,
      );
    })
    .catch((error) => {
      console.log(
        `error: ${WORKFLOW_OWNER}/${WORKFLOW_REPO}/${WORKFLOW_ID}:${WORKFLOW_REF} workflow_dispatch`,
      );
      throw error;
    }
  );
};
