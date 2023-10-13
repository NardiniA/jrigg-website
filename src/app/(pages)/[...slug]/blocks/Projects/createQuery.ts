import type { Query } from "@/types/where";
import type { Project } from "@/types/payload-types";
import { getSettings } from "@/lib/getSettings";

type CreateQuery = (options?: { type: "automatic" | "manual", complete: "wip" | "complete" | "both", manual: Project[] }) => Promise<Query>;

export const createQuery: CreateQuery = async (options) => {
  const pgn = (await getSettings()).config.projectsPerPage;

  const completeQuery =
    options?.complete === "both"
      ? {
          complete: {
            exists: true,
          },
        }
      : {
          complete: {
            equals: Boolean(options?.complete === "complete"),
          },
        };

  const query: Query =
    options?.type === "manual"
      ? {
          where: {
            AND: [
              completeQuery,
              {
                id: {
                  in: options?.manual?.map(({ id }: { id: string }) => id),
                },
              },
            ],
          },
          limit: pgn,
          sort: "-updatedAt",
        }
      : {
          where: completeQuery,
          limit: pgn,
          sort: "-updatedAt",
        };

  return query;
} 