export async function wpQuery(query: string, variables = {}) {
  const apiUrl = process.env.WORDPRESS_API_URL;

  if (!apiUrl) {
    throw new Error('WORDPRESS_API_URL is not set');
  }

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 10000);

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
      signal: controller.signal,
      cache: 'no-store',
    });

    const json = await response.json();

    if (json.errors) {
      console.error(json.errors);
      throw new Error(json.errors[0].message);
    }

    return json.data;
  } finally {
    clearTimeout(timeout);
  }
}