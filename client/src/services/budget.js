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

export const BudgetsGetter = async () => {
  try {
    const res = await Client.get(`/api/budget/`);
    return res.data;
  } catch (error) {
    console.error("Error in getting the budget :", error.message);
    throw error;
  }
};

export const OneBudgetGetter = async (id) => {
  try {
    const res = await Client.get(`api/budget/${id}`);
    return res.data;
  } catch (error) {
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      console.error("Network or config error:", error.message);
    }
    throw error;
  }
};

export const BudgetEdit = async (obj, id) => {
  try {
    const res = await Client.put(`/api/budget/${id}/`, obj);
    return res;
  } catch (error) {
    console.error("Error in setting the budget :", error.message);
    throw error;
  }
};

export const BudgetDelete = async (id) => {
  try {
    const res = await Client.delete(`/api/budget/${id}/`);
    return res;
  } catch (error) {
    console.error("Error in setting the budget :", error.Client.message);
    throw error;
  }
};
