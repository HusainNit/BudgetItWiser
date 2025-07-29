import Client from "./api";

export const BudgetSetter = async (obj) => {
  try {
    const res = await Client.post(`/api/budget/`, obj);
    return res;
  } catch (error) {
    console.error("Error in setting the budget :", error.Client.message);
    throw error;
  }
};

export const BudgetGetter = async () => {
  try {
    const res = await Client.get(`/api/budget/`);
    return res.data;
  } catch (error) {
    console.error("Error in getting the budget :", error.Client.message);
    throw error;
  }
};
