export async function fetchData() {
  try {
    const response = await fetch(
      "https://6511a930b8c6ce52b394dc63.mockapi.io/api/users/users"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error: any) {
    throw new Error(
      `An error occurred while fetching the data: ${error.message}`
    );
  }
}
