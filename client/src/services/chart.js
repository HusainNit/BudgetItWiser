import Client from "./api";

export const chartGetter = async () => {
  try {
    const res = await Client.get("/api/budget/summary/");
    return res.data;
  } catch (error) {
    console.log(`error in chart data getter: ${error.message}`);
    throw error;
  }
};
