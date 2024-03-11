import { createAsyncThunk } from "@reduxjs/toolkit";
// import httpFetch from "@/utils/httpFetch";
export const fetchCompanies = createAsyncThunk(
  "companies/fetchCompanies",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return [
      { name: "Nike", id: 1 },
      { name: "Adidas", id: 2 },
      { name: "Puma", id: 3 },
      { name: "Linkedin", id: 4 },
      { name: "Facebook", id: 5 },
    ];
    // const response = await httpFetch.get("/company");
    // return response.data;
  }
);

export const addCompany = createAsyncThunk(
  "companies/addCompany",
  async (newCompany) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return newCompany;
  }
);

export const updateCompany = createAsyncThunk(
  "companies/updateCompany",
  async (updatedCompany) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return updatedCompany;
    // const response = await httpFetch.put(
    //   `/company/${updatedCompany.id}`,
    //   updatedCompany
    // );
    // return response.data;
  }
);

export const deleteCompany = createAsyncThunk(
  "companies/deleteCompany",
  async (companyId) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // await httpFetch.delete(`/company/${companyId}`);
    return companyId;
  }
);
