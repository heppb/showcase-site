import DiscogResponse from "../models/DiscogResponse";

const retrieveRecords = async (page: number, perPage: number, fetchAll: boolean): Promise<DiscogResponse | null> => {
  try {
    const user: string = localStorage.getItem('user') || (process.env.USER || "");
    const token: string = process.env.DISCOG_TOKEN || "";

    // If fetchAll is false, fetch just the requested page
    if (!fetchAll) {
      const response = await fetch(
        `https://api.discogs.com/users/${user}/collection/folders/0/releases?token=${token}&page=${page}&per_page=${perPage}&sort=artist`
      );

      const data = (await response.json()) as DiscogResponse;
      return data;
    }

    // If fetchAll is true, we need to loop through all pages and accumulate releases
    let allReleases: any[] = [];
    let currentPage = page;  // Start with the initial page

    while (true) {
      const response = await fetch(
        `https://api.discogs.com/users/${user}/collection/folders/0/releases?token=${token}&page=${currentPage}&per_page=${perPage}&sort=artist`
      );

      const data = await response.json();

      // Accumulate releases from the current page
      allReleases = [...allReleases, ...data.releases];

      // If there are no more pages, break the loop
      if (!data.pagination || currentPage >= data.pagination.pages) {
        break;
      }

      // Otherwise, move to the next page
      currentPage++;
    }

    // Return the combined data
    if (allReleases.length > 0) {
      const combinedResponse: DiscogResponse = {
        releases: allReleases,  // All releases accumulated
        pagination: {
          page: 1, // We're now returning all records as a single page
          pages: 1, // Set pages to 1 since it's a single combined result
          per_page: perPage,
          items: allReleases.length,
          urls: undefined
        },
      };

      return combinedResponse;
    }

    return null;  // If no records were fetched, return null

  } catch (error) {
    console.error("Error fetching records:", error);
    return null;
  }
};

export default retrieveRecords;