import { MeiliSearch } from "meilisearch";
const host = process.env.NEXT_PUBLIC_MEILISEARCH_HOST || '';
const apiKey = process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY || '';

const client = new MeiliSearch({
  host: host,
  apiKey: apiKey,
})

const setupFilterableAttributes = async () => {
  try {
    await client.index("exhibit").updateFilterableAttributes(["category_artifact", "year"]);
    await client.index("post").updateFilterableAttributes(["category", "date"]);
    console.log("FilterableAttributes setup completed");
  } catch (error) {
    console.error("Error setting up filterable attributes:", error);
  }
};

setupFilterableAttributes();

export const searchExhibitions = async (
  page: number,
  pageSize: number,
  query: string,
  category_artifact: string[], year: number[]
) => {
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

  const results = await client.index("post").search(query, {
    limit: pageSize,
    page: page,
    filter: condition,
    attributesToRetrieve: ["id", "title", "content", "category", "date", "image", "slug", "documentId"],
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
