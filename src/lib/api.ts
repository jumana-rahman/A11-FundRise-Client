const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function getToken(): string | null {
  return localStorage.getItem("fundrise_token");
}

/**
 * Custom error class that carries the HTTP status code.
 * Components can check `error.status` to decide how to handle errors.
 */
export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/**
 * Handles 401 and 403 responses globally.
 * - 401 (Unauthorized): Token expired or invalid → clear token, redirect to login
 * - 403 (Forbidden): User doesn't have the required role → redirect to /forbidden
 *
 * This is called by the request() function when the server returns 401 or 403.
 * Individual pages can still catch ApiError and handle it locally if needed.
 */
function handleAuthError(status: number): never {
  // Only redirect if we're in a browser context
  if (typeof window !== "undefined") {
    if (status === 401) {
      // Clear stale token
      localStorage.removeItem("fundrise_token");
      // Redirect to unauthorized page (not login, to show the proper 401 page)
      window.location.href = "/unauthorized";
    } else if (status === 403) {
      window.location.href = "/forbidden";
    }
  }
  throw new ApiError(
    status === 401 ? "Authentication required" : "Insufficient permissions",
    status
  );
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });

  // Handle auth errors globally before parsing body
  if (res.status === 401) {
    handleAuthError(401);
  }
  if (res.status === 403) {
    handleAuthError(403);
  }

  const text = await res.text();
  let data: any;
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }

  if (!res.ok) {
    throw new ApiError(data?.error || `Request failed (${res.status})`, res.status);
  }
  return data as T;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: any) =>
    request<T>(path, { method: "POST", body: body ? JSON.stringify(body) : undefined }),
  put: <T>(path: string, body?: any) =>
    request<T>(path, { method: "PUT", body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(path: string, body?: any) =>
    request<T>(path, { method: "PATCH", body: body ? JSON.stringify(body) : undefined }),
  del: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};
