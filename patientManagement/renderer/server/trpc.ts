
import { createTRPCProxyClient } from "@trpc/client";
import  {createRouter} from '@trpc'
import type { inferRouterProxyClient } from "@trpc/client";
import { httpLink } from "@trpc/client/links/httpLink";
import { API_URL } from "./root";

const clientTRPC = createTRPCProxyClient({
  links: [httpLink({ url: API_URL })],
});

export type clientTRPC = typeof clientTRPC;
// export type AppTRPCResult<R extends keyof clientTRPC> = inferRouterProxyClient

export default clientTRPC;

export const router = clientTRPC