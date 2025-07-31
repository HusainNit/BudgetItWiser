import Client from "./api";

export const ExpenseSetter = async (obj) => {
  try {
    const res = await Client.post(`/api/expenses/`, obj);
    return res;
  } catch (error) {
    console.error("Error in setting the budget :", error.Client.message);
    throw error;
  }
};

export const ExpensesGetter = async () => {
  try {
    const res = await Client.get(`/api/expenses/`);
    return res.data;
  } catch (error) {
    console.error("Error in getting the budget :", error.message);
    throw error;
  }
};

export const OneExpenseGetter = async (id) => {
  try {
    const res = await Client.get(`/api/expenses/${id}`);
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

export const ExpenseEdit = async (obj, id) => {
  try {
    const res = await Client.put(`/api/expenses/${id}/`, obj);
    return res;
  } catch (error) {
    console.error("Error in setting the expense :", error.message);
    throw error;
  }
};

export const ExpenseDelete = async (id) => {
  try {
    const res = await Client.delete(`/api/expenses/${id}/`);
    return res;
  } catch (error) {
    console.error("Error in setting the expense :", error.Client.message);
    throw error;
  }
};
