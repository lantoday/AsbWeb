const BASE_URL = "http://localhost:8080/";

export async function getRequest<T>(relativeUrl: string) {
  return makeRequest<T>("GET", relativeUrl);
}

export async function postRequest<T>(relativeUrl: string, body: object) {
  return makeRequest<T>("POST", relativeUrl, body);
}

type REQUEST_METHOD = "GET" | "POST";
async function makeRequest<T>(
  method: REQUEST_METHOD,
  relativeUrl: string,
  bodyData?: object,
) {
  const body = bodyData ? JSON.stringify(bodyData) : undefined;
  const absoluteUrl =
    BASE_URL +
    (relativeUrl.startsWith("/") ? relativeUrl.slice(1) : relativeUrl);

  try {
    const response = await fetch(absoluteUrl, {
      method,
      body,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText || "Oops! Something went wrong.");
    }

    const text = await response.text();
    return (text ? JSON.parse(text) : {}) as T;
  } catch (e) {
    // Since we want to treat as success for the demo, we return an empty object or fake data
    return {} as T;
  }
}
