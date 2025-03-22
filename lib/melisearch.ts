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

export const searchPost = async (
  page: number,
  pageSize: number,
  query: string,
  category?: string[],
) => {
  const condition = category ? `category.id IN [${category.join(",")}]` : "";

  await client.index("post").updateFilterableAttributes(["category", "date"]);

  const results = await client.index("post").search(query, {
    limit: pageSize,
    page: page,
    filter: condition,
    attributesToRetrieve: ["id", "title", "content", "category", "date", "image", "slug"],
  });
  return results;
};

export const overallSearch = async (page: number, pageSize: number, query: string) => {
  const results = await client.multiSearch({
    queries: [
      {
        indexUid: "post",
        q: query,
        limit: pageSize,  
        offset: (page - 1) * pageSize,
      },
      {
        indexUid: "exhibit",
        q: query,
        limit: pageSize,
        offset: (page - 1) * pageSize,
      },
    ]
  });

  return results;
};


