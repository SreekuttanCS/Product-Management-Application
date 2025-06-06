const apiUrl = import.meta.env.VITE_API_URL;

export async function fetchProducts() {
  const response = await fetch(`${apiUrl}/products`);
  return response.json();
}
