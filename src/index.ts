import { triggerWorkflowDispatch } from "./trigger-ga-workflow-dispatch";

export interface Env {
  // GitHub App の ID
  GITHUB_APP_ID: string;
  // GitHub App の private key
  GITHUB_SECRET_KEY: string;
  // GitHub App の installation ID
  GITHUB_APP_INSTALLATION_ID: string;
}

export default {
	async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
    await triggerWorkflowDispatch({ appId: env.GITHUB_APP_ID, secretKey: env.GITHUB_SECRET_KEY, installationId: env.GITHUB_APP_INSTALLATION_ID });
	},
};
