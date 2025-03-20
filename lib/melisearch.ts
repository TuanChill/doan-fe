import { MeiliSearch } from "meilisearch";
const host = process.env.NEXT_PUBLIC_MEILISEARCH_HOST || '';
const apiKey = process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY || '';

const client = new MeiliSearch({
  host: host,
  apiKey: apiKey,
})

export const searchExhibitions = async (
  page: number,
  pageSize: number,
  query: string,
  category_artifact: string[], year: number[]
) => {
  await client.index("exhibit").updateFilterableAttributes(["category_artifact", "year"]);
  const results = await client.index("exhibit").search(query, {
        limit: pageSize,
        page: page,
        filter: ` ${category_artifact.length > 0 ? `category_artifact.id IN [${category_artifact.join(",")}]` : ""} ${year.length > 0 ? `year >= ${year[0]} AND year <= ${year[1]}` : ""}`
    }
  );
  return results;
};
