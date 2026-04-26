import i18n from "../i18n";

const api = {
  get: async <T>(url: string): Promise<T> => {
    const res = await fetch(url, {
      headers: {
        "Accept-Language": i18n.language,
      },
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    return res.json();
  },
};

export default api;
