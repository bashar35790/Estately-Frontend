import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const buildUrl = (path: string): string => {
  if (!baseUrl) {
    console.error(
      "CRITICAL ERROR: NEXT_PUBLIC_BASE_URL is undefined. Check your .env file!",
    );
    return path;
  }
  const cleanBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${cleanBase}/${cleanPath}`;
};

const getAuthHeaders = async (): Promise<Record<string, string>> => {
  const token = await getUserToken();
  if (token) {
    return { "x-session-token": token };
  }
  return {};
};

export const serverAction = async (path: string, options?: RequestInit) => {
  const fullUrl = buildUrl(path);
  const authHeaders = await getAuthHeaders();

  try {
    const res = await fetch(fullUrl, {
      cache: options?.cache ?? "no-store",
      next: options?.next,
      ...options,
      headers: {
        ...authHeaders,
        ...options?.headers,
      },
    });

    if (!res.ok) {
      console.error(`API Error (${res.status}) on URL:`, fullUrl);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error(`Error fetching data from ${fullUrl}:`, error);
    return null;
  }
};

export const serverMutation = async (
  path: string,
  method: string,
  body: any,
) => {
  const fullUrl = buildUrl(path);
  const authHeaders = await getAuthHeaders();

  try {
    const res = await fetch(fullUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
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
