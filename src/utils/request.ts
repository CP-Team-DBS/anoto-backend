export default async (
  url: string,
  method: string,
  body: Record<string, number | string>,
): Promise<Response> => {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Gagal mendapatkan hasil: ${response.statusText}`);
  }

  return response;
};
