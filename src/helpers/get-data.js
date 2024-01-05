import { pagesEndpoint } from "../api-endpoints/wordpress";
/**
 * Helper function that gets data from a page
 */

  // Get full list of areas with members list
  const getData = async (url, id, st) => {
    const response = await fetch(`${url ? url : pagesEndpoint}/${id ? id : ''}`)
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    const data = await response.json();
    if (!data) return
    st && st(data)
  }


export default getData;