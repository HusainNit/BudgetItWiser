import Client from "./api";

export const BudgetSetter = async (obj) => {
  try {
    const res = await Client.push(`/api/budget/`, obj);
    return res;
  } catch (error) {
    console.error("Error in setting the budget :", error.Client.message);
    throw error;
  }
};
