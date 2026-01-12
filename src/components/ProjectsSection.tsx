import ProjectCard from './ProjectCard';
import TerminalText from './TerminalText';
import { useTina, tinaField } from 'tinacms/dist/react';
import { useState, useEffect } from 'react';
import client from '../../tina/__generated__/client';

const ProjectsSection = () => {
  const [projectsData, setProjectsData] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Fetch the list of all projects
        const projectsResponse = await client.queries.projectsConnection();
        const projects = projectsResponse.data.projectsConnection.edges || [];
        
        // Fetch each project individually with useTina support
        const projectPromises = projects.map(async (edge: any) => {
          const project = await client.queries.projects({
            relativePath: edge.node._sys.filename,
          });
          return project;
        });
        
        const allProjects = await Promise.all(projectPromises);
        setProjectsData(allProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (isLoading) {
    return (
      <section id="projects" className="py-24 relative">
        <div className="section-container">
          <p className="text-center text-muted-foreground">Loading projects...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
      
      <div className="section-container relative z-10">
        {/* Section header */}
        <div className="mb-12">
          <TerminalText command="ls -la ~/projects" output={`${projectsData.length} directories, 0 files`} />
          <h2 className="text-3xl sm:text-4xl font-semibold mt-2 mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            These projects are built around real IT workflows, with an emphasis on troubleshooting, automation, networking, and hands-on iteration. Each one started with a problem
            and built with a hands-on tinkering!
          </p>
        </div>

        {/* Project grid - 3 columns on large screens */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((projectQuery, index) => {
            const { data } = useTina({
              query: projectQuery.query,
              variables: projectQuery.variables,
              data: projectQuery.data,
            });
            
            const project = data.projects;
            
            return (
              <div key={index} data-tina-field={tinaField(project, 'title')}>
                <ProjectCard 
                  title={project.title}
                  summary={project.summary}
                  covers={project.covers}
                  skills={project.skills}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;