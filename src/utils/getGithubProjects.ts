import type { GithubProject, ProjectMedia } from '@/src/types/projects';

const GITHUB_USERNAME = 'tristanparry';
const GITHUB_USERS_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;
const GITHUB_REPOS_API_URL = `https://api.github.com/repos/${GITHUB_USERNAME}`;
const GITHUB_REPOS_VIDEO_FILENAME = 'demo_video.mp4';
const GITHUB_REPOS_IMAGE_FILENAME = 'demo_screenshot.png';

interface GithubProjectResponse {
  name: string;
  description: string;
  html_url: string;
  forks: number;
  pushed_at: string;
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

interface GithubContentResponse {
  name: string;
  download_url: string | null;
  type: string;
}

const getProjectMedia = async (
  projectName: string,
): Promise<ProjectMedia | undefined> => {
  try {
    const response = await fetch(
      `${GITHUB_REPOS_API_URL}/${projectName}/contents`,
    );
    if (!response.ok) return undefined;
    const contents = (await response.json()) as GithubContentResponse[];
    const mediaFile = contents.find(
      (file) =>
        file.type === 'file' &&
        (file.name === GITHUB_REPOS_VIDEO_FILENAME ||
          file.name === GITHUB_REPOS_IMAGE_FILENAME),
    );
    if (!mediaFile?.download_url) return undefined;
    return {
      url: mediaFile.download_url,
      type: mediaFile.name === GITHUB_REPOS_VIDEO_FILENAME ? 'video' : 'image',
    };
  } catch {
    return undefined;
  }
};
