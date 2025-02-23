import { Button } from "@/components/ui/button";
import { Linkedin, Mail } from "lucide-react";
import { FaGithub, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import ProjectCardV2 from "@/components/ProjectCardV2";
import TechStackV2 from "@/components/TechStackV2";
import ExperienceCardV2 from "@/components/ExperienceCardV2";
import { getNewestExperience } from "@/server/queries/experience-queries";
import { getNewestProject } from "@/server/queries/project-queries";

export default async function Page() {
  const project = await getNewestProject();
  const experiences = await getNewestExperience();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <span className="hidden font-bold sm:inline-block">rizrmdhn</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link
                href="#about"
                className="transition-colors hover:text-foreground/80"
              >
                About
              </Link>
              <Link
                href="#experience"
                className="transition-colors hover:text-foreground/80"
              >
                Experience
              </Link>
              <Link
                href="#projects"
                className="transition-colors hover:text-foreground/80"
              >
                Projects
              </Link>
              <Link
                href="#contact"
                className="transition-colors hover:text-foreground/80"
              >
                Contact
              </Link>
            </nav>
          </div>
          <Button variant="outline" className="ml-auto">
            Resume
          </Button>
        </div>
      </header>

      <main className="container px-4 md:px-6">
        <section id="about" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Full Stack Developer
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                  Im a freelance web developer, Im passionate about technology
                  and I love to learn new things.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="https://github.com/rizrmdhn" target="_blank">
                  <Button variant="outline" size="icon">
                    <FaGithub className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/rizrmdhn/"
                  target="_blank"
                >
                  <Button variant="outline" size="icon">
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </Link>
                <Link href="https://x.com/rizrmdhn_" target="_blank">
                  <Button variant="outline" size="icon">
                    <FaTwitter className="h-4 w-4" />
                    <span className="sr-only">Twitter</span>
                  </Button>
                </Link>
                <Link href="mailto:rizrmdhn.work@gmail.com">
                  <Button variant="outline" size="icon">
                    <Mail className="h-4 w-4" />
                    <span className="sr-only">Email</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Work Experience
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {experiences.map((exp) => (
                <ExperienceCardV2
                  key={exp.id}
                  title={exp.name}
                  company={exp.company}
                  period={exp.date}
                  description={exp.description}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Projects
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {project.map((proj) => (
                <ProjectCardV2
                  key={proj.id}
                  title={proj.name}
                  description={proj.description ?? "No description provided."}
                  image={proj.image_url ?? "/images/loader.png"}
                  link={proj.github_url}
                  tags={proj.tech}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Tech Stack
            </h2>
            <TechStackV2 />
          </div>
        </section>

        <section id="contact" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl">
              <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Get in Touch
              </h2>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container flex w-full shrink-0 flex-col items-center gap-2 px-4 py-6 sm:flex-row md:px-6">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2024 rizrmdhn. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:ml-auto sm:gap-6">
            <Link
              className="text-xs underline-offset-4 hover:underline"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-xs underline-offset-4 hover:underline"
              href="#"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
