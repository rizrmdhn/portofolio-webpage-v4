import Image from "next/image";
import Link from "next/link";
import SkillCard from "@/components/SkillCard";
import ProjectCard from "@/components/ProjectCard";
import SocialMediaCard from "@/components/SocialMediaCard";
import ExperienceCard from "@/components/ExperienceCard";
import { FaGithub, FaLinkedin, FaReact } from "react-icons/fa";
import {
  SiDart,
  SiJetpackcompose,
  SiKotlin,
  SiNextdotjs,
  SiTypescript,
} from "react-icons/si";
import { IoIosMail, IoLogoJavascript } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { ThemeButton } from "@/components/ThemeButton";
import { getNewestProject } from "@/server/queries/project-queries";
import { type Skills } from "@/types/skills";
import { type SocialMedia } from "@/types/social-media";
import { getNewestExperience } from "@/server/queries/experience-queries";
import { Suspense } from "react";
import ProjectCardLoader from "@/components/ProjectCardLoader";

export default async function Home() {
  const project = await getNewestProject();
  const experiences = await getNewestExperience();

  const skills: Skills[] = [
    {
      name: "JavaScript",
      icon: <IoLogoJavascript className="h-12 w-12" />,
    },
    {
      name: "TypeScript",
      icon: <SiTypescript className="h-12 w-12" />,
    },
    {
      name: "Dart",
      icon: <SiDart className="h-12 w-12" />,
    },
    {
      name: "Kotlin",
      icon: <SiKotlin className="h-12 w-12" />,
    },
    {
      name: "React",
      icon: <FaReact className="h-12 w-12" />,
    },
    {
      name: "React Native",
      icon: <FaReact className="h-12 w-12" />,
    },
    {
      name: "Next.js",
      icon: <SiNextdotjs className="h-12 w-12" />,
    },
    {
      name: "Jetpack Compose",
      icon: <SiJetpackcompose className="h-12 w-12" />,
    },
  ];

  const socialMedia: SocialMedia[] = [
    {
      name: "GitHub",
      icon: <FaGithub className="h-12 w-12" />,
      link: "https://github.com/rizrmdhn",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin className="h-12 w-12" />,
      link: "https://www.linkedin.com/in/rizrmdhn/",
    },
    {
      name: "X (Twitter)",
      icon: <FaXTwitter className="h-12 w-12" />,
      link: "https://x.com/rizrmdhn_",
    },
    {
      name: "Email",
      icon: <IoIosMail className="h-12 w-12" />,
      link: "mailto:rizrmdhn.work@gmail.com",
    },
  ];

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Noor Rizki Ramadhan
                </h1>
                <h2 className="text-xl font-medium text-gray-500 dark:text-gray-400">
                  Web Developer
                </h2>
                <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
                  Im a freelance web developer, Im passionate about technology
                  and I love to learn new things.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/rizrmdhn"
                >
                  View Projects
                </Link>
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  href="#contact"
                >
                  Contact Me
                </Link>
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  href="/v2"
                >
                  V2
                </Link>
              </div>
            </div>
            <Image
              alt="Hero"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              height="550"
              src="/avatar.jpg"
              width="550"
            />
          </div>
        </div>
      </section>
      <section
        className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32"
        id="projects"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                My Projects
              </h2>
              <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Check out some of the web applications Ive built.
              </p>
            </div>
          </div>
          {project.length > 0 ? (
            <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
              <Suspense
                fallback={Array.from({ length: 6 }).map((_, index) => (
                  <ProjectCardLoader key={index} />
                ))}
              >
                {project.map((project, index) => (
                  <ProjectCard key={index} {...project} />
                ))}
              </Suspense>
            </div>
          ) : (
            <div className="flex w-full flex-col items-center justify-center space-y-4 pt-10 text-center">
              <p className="text-center text-gray-500 dark:text-gray-400">
                Sorry no projects added yet.
              </p>
            </div>
          )}
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32" id="skills">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                My Experience
              </h2>
              <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Here are some of my work experiences.
              </p>
            </div>
          </div>
          {experiences.length > 0 ? (
            <div className="flex w-full flex-col items-center justify-center pb-5 pt-5">
              {experiences.map((skill, index) => (
                // every 2nd element restarts to position 0
                <ExperienceCard
                  key={index}
                  {...skill}
                  position={index % 2 === 0 ? 0 : 1}
                />
              ))}
            </div>
          ) : (
            <div className="flex w-full flex-col items-center justify-center space-y-4 pt-10 text-center">
              <p className="text-center text-gray-500 dark:text-gray-400">
                Sorry no experiences added yet.
              </p>
            </div>
          )}
        </div>
      </section>
      <section className="w-full border-t py-12 md:py-24 lg:py-32" id="skills">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                My Skills
              </h2>
              <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Here are some of the technologies Im proficient in.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 py-12 sm:grid-cols-3 lg:grid-cols-4">
            {skills.map((skill, index) => (
              <SkillCard key={index} {...skill} />
            ))}
          </div>
        </div>
      </section>
      <section className="w-full border-t py-12 md:py-24 lg:py-32" id="contact">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              My Social Media
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              You can contact me through social media or email.
            </p>
          </div>
          <div className="mx-auto flex w-full max-w-sm flex-row gap-4 space-y-2">
            {socialMedia.map((social, index) => (
              <SocialMediaCard key={index} {...social} />
            ))}
          </div>
        </div>
      </section>
      <ThemeButton />
    </div>
  );
}
