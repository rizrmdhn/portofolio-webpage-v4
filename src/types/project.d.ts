export type Project = {
  project: ProjectElement[];
};

export type ProjectElement = {
  name: string;
  description: string;
  url: string;
  githubUrl: string;
  tech: string[];
  image: Image[];
};

export type Image = {
  url: string;
  alt: string;
};
