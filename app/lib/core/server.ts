const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Helper function to safely join baseUrl and path without breaking slashes
const buildUrl = (path: string): string => {
  if (!baseUrl) {
    console.error(
      "CRITICAL ERROR: NEXT_PUBLIC_BASE_URL is undefined. Check your .env file!",
    );
    return path;
  }
  // Remove trailing slash from base, remove leading slash from path, join with single slash
  const cleanBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${cleanBase}/${cleanPath}`;
};

export const serverAction = async (path: string) => {
  const fullUrl = buildUrl(path);

  try {
    const res = await fetch(fullUrl, {
      cache: "no-store",
    });

    // handle HTTP errors
    if (!res.ok) {
      console.error(`API Error (${res.status}) on URL:`, fullUrl);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error(`Error fetching data from ${fullUrl}:`, error);
    return [];
  }
};

export const serverMutation = async (
  path: string,
  method: string,
  body: any,
) => {
  const fullUrl = buildUrl(path);

  try {
    const res = await fetch(fullUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      console.error(`Mutation Error (${res.status}) on URL:`, fullUrl);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error(`Error mutating data at ${fullUrl}:`, error);
    return null;
  }
};
