import ProjectCard from './ProjectCard';
import TerminalText from './TerminalText';
import { useTina, tinaField } from 'tinacms/dist/react';

// Import all project JSON files
import enterpriseInfra from '../content/projects/enterprise-infrastructure.json';
import helpDesk from '../content/projects/help-desk-ticketing.json';
import activeDirectory from '../content/projects/active-directory-lab.json';
import windowsTroubleshooting from '../content/projects/windows-troubleshooting.json';
import clarityPc from '../content/projects/claritypc-dashboard.json';
import majlisAi from '../content/projects/majlis-ai.json';

const ProjectsSection = () => {
  // Load all projects with TinaCMS support
  const projectFiles = [
    { filename: 'enterprise-infrastructure.json', data: enterpriseInfra },
    { filename: 'help-desk-ticketing.json', data: helpDesk },
    { filename: 'active-directory-lab.json', data: activeDirectory },
    { filename: 'windows-troubleshooting.json', data: windowsTroubleshooting },
    { filename: 'claritypc-dashboard.json', data: clarityPc },
    { filename: 'majlis-ai.json', data: majlisAi },
  ];

  // Sort by order field
  const sortedProjects = projectFiles.sort((a, b) => a.data.order - b.data.order);
  return (
    <section id="projects" className="py-24 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
      
      <div className="section-container relative z-10">
        {/* Section header */}
        <div className="mb-12">
          <TerminalText command="ls -la ~/projects" output="6 directories, 0 files" />
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
          {sortedProjects.map((projectFile, index) => {
            // Wrap each project with useTina for visual editing
            const { data } = useTina({
              query: `query Projects($relativePath: String!) {
                projects(relativePath: $relativePath) {
                  title
                  summary
                  covers
                  skills
                  importance
                  videoUrl
                  order
                }
              }`,
              variables: { relativePath: projectFile.filename },
              data: { projects: projectFile.data },
            });

            const project = data?.projects;

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