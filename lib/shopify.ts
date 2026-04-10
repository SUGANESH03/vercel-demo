const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN;
const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION;

if (!SHOPIFY_STORE_DOMAIN) {
  throw new Error("Missing SHOPIFY_STORE_DOMAIN environment variable");
}

if (!SHOPIFY_STOREFRONT_TOKEN) {
  throw new Error("Missing SHOPIFY_STOREFRONT_TOKEN environment variable");
}

if (!SHOPIFY_API_VERSION) {
  throw new Error("Missing SHOPIFY_API_VERSION environment variable");
}

const SHOPIFY_API_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

/**
 * Notice: token is now GUARANTEED to be string
 */
const SHOPIFY_HEADERS: HeadersInit = {
  "Content-Type": "application/json",
  "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
};

export async function shopifyFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, any>;
}): Promise<T> {
  const response = await fetch(SHOPIFY_API_URL, {
    method: "POST",
    headers: SHOPIFY_HEADERS,
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Shopify API error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}