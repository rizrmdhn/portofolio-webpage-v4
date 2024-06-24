import { ApiResponse } from "@/types/response";
import axios, { AxiosRequestConfig } from "axios";

const baseUrl = "https://api.github.com/graphql";

async function fetchWithAuth(url: string, options: AxiosRequestConfig = {}) {
  return axios(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });
}

const github = (() => {
  async function getPinnedRepos() {
    const query = `
        {
            user(login: "rizrmdhn") {
              pinnedItems(first: 6, types: REPOSITORY) {
                nodes {
                  ... on Repository {
                    name
                    description
                    url
                    homepageUrl
                    languages(first: 5) {
                    nodes {
                      name
                    }
                  }
                  }
                }
              }
            }
          }`;

    const response = await fetchWithAuth(baseUrl, {
      method: "POST",
      data: { query },
    });

    const { data } = response.data as ApiResponse;

    return data.user.pinnedItems.nodes;
  }

  return {
    getPinnedRepos,
  };
})();

export { github };
