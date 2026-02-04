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

    // Commented out for fake testing purposes
    /*
        if (!response.ok) {
            throw new Error(response.statusText || 'Oops! Something went wrong.');
        }
        */

    // Faking responses for specific endpoints as requested
    if (relativeUrl.includes("Account/Profile")) {
      return {
        FirstName: "Lan",
        LastName: "Chen",
        Occupation: "Software Engineer",
        TechSet: [
          ".NET",
          "React",
          "TypeScript",
          "SCSS",
          "Azure DevOps",
          "Microsoft Azure",
          "SQL",
          "Git",
        ],
      } as unknown as T;
    }

    if (relativeUrl.includes("Account/RegisterCard")) {
      return { success: true } as unknown as T;
    }

    const text = await response.text();
    return (text ? JSON.parse(text) : {}) as T;
  } catch (e) {
    // Since we want to treat as success for the demo, we return an empty object or fake data
    return {} as T;
  }
}
