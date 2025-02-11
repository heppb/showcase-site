import DiscogResponse from "../models/DiscogResponse";

const retrieveRecords = async (page: Number, perPage: Number): Promise<DiscogResponse | null> => {
  try {
    const user: string = localStorage.getItem('user') || (process.env.USER || "");
    const token: string = process.env.DISCOG_TOKEN || "";
    const response = await fetch(
      `https://api.discogs.com/users/${user}/collection/folders/0/releases?token=${token}&page=${page}&per_page=${perPage}&sort=artist`
    );

    const data = (await response.json()) as DiscogResponse;
    return data;
  } catch {
    return null;
  }
};

export default retrieveRecords;