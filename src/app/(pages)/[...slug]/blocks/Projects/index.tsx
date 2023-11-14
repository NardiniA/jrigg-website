import Transport from "@/lib/transport";
import Column from "@/components/Projects/Column";
import { Project } from "@/types/payload-types";
import { createQuery } from "./createQuery";

const Projects: React.FC<{
  section: {
    type: "automatic" | "manual";
    complete: "wip" | "complete" | "both";
    manual: Project[];
  };
  priority: boolean;
}> = async ({ section }) => {
  const query = await createQuery(section);

  const transport = new Transport({
    collection: "projects",
    query: query,
  });

  const proj = (
    await transport.get({
      draftable: true,
      options: { next: { tags: ["projects"] } },
    })
  ).value("docs");

  if (!!proj?.length) return <Column docs={proj} />;

  return (
    <section className="section">
      <div className="container">
        <p>No projects available. Please try again later.</p>
      </div>
    </section>
  );
};

export default Projects;
