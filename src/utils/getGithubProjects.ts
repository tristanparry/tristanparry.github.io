const GITHUB_USERNAME = 'tristanparry';
const GITHUB_USERS_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;
const GITHUB_REPOS_API_URL = `https://api.github.com/repos/${GITHUB_USERNAME}`;
const GITHUB_RAW_IMAGE_URL = `https://raw.githubusercontent.com/${GITHUB_USERNAME}`;

interface GithubProjectResponse {
  name: string;
  description: string;
  html_url: string;
  forks: number;
  pushed_at: string;
}

export interface GithubProject {
  name: string;
  description: string;
  url: string;
  languages: string[];
  forks: number;
  media?: { image?: Blob; video?: Blob };
}

export const getGithubProjects = async (): Promise<GithubProject[]> => {
  const response = await fetch(`${GITHUB_USERS_API_URL}/starred`);
  const data = ((await response.json()) || []).sort(
    (a: GithubProjectResponse, b: GithubProjectResponse) =>
      new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
  );
  return await Promise.all(
    data.map(
      async (project: GithubProjectResponse): Promise<GithubProject> => ({
        name: project.name,
        description: `projects.repos.descriptions.${project.name.toLowerCase()}`,
        url: project.html_url,
        languages: await getProjectLanguages(project.name),
        forks: project.forks,
        media: await getProjectMedia(project.name),
      }),
    ),
  );
};

const getProjectLanguages = async (projectName: string): Promise<string[]> => {
  const response = await fetch(
    `${GITHUB_REPOS_API_URL}/${projectName}/languages`,
  );
  const data = (await response.json()) || {};
  return Object.keys(data);
};

const fileExists = async (url: string): Promise<boolean> => {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.ok;
  } catch {
    return false;
  }
};

const getProjectMedia = async (
  projectName: string,
): Promise<{ image?: Blob; video?: Blob } | undefined> => {
  const videoUrl = `${GITHUB_RAW_IMAGE_URL}/${projectName}/main/demo_video.mp4`;
  const imageUrl = `${GITHUB_RAW_IMAGE_URL}/${projectName}/main/demo_screenshot.png`;

  if (await fileExists(videoUrl)) {
    const video = await fetch(videoUrl).then((r) => r.blob());
    return { video };
  }

  if (await fileExists(imageUrl)) {
    const image = await fetch(imageUrl).then((r) => r.blob());
    return { image };
  }

  return undefined;
};
