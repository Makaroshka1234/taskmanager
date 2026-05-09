export async function apiFetch(url: string, options?: RequestInit) {
  let res = await fetch(url, {
    ...options,
    credentials: "include",
  });

  if (res.status === 401) {
    const data = await res.json();

    if (data.message === "TOKEN_EXPIRED") {
      const refreshRes = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include",
      });

      if (!refreshRes.ok) {
        window.location.href = "/login";
        return res;
      }

      // retry
      res = await fetch(url, {
        ...options,
        credentials: "include",
      });
    } else {
      window.location.href = "/login";
    }
  }

  return res;
}
