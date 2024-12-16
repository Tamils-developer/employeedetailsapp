import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const role = {role:'admin',userName:'admin',password:'admin'}
localStorage.setItem('user',JSON.stringify(role))
const userId = JSON.parse(localStorage.getItem("user") || "").username

const allMenuDetails = {
  basicDetails: false,
  contactDetails: false,
  educationalDetails: false,
  bankDetails: false,
  documentsUpload: false,
  experienceDetails: false,
  nomineeDetails: false,
  reguestForApproval: false,
  userId: false,
};

export const fetchBasicDetails = createAsyncThunk('fetchBasicDetails',
  async (id: any) => {
    const response = await axios.get(
      `http://localhost:8081/empdetailsms/employees/${id}`)
    return response.data;
  })

export const fetchBasicDetailsId = createAsyncThunk('fetchBasicDetailsId',
  async (inputs: any) => {
    const response = await axios.post(
      `http://localhost:8081/empdetailsms/employees/`, inputs, {
      headers: {
        userId: userId,
      },
    })
    return response.data;
  })
export const putBasicDetails = createAsyncThunk('putBasicDetails',
  async (inputs: any) => {
    const response = await axios.put(
      `http://localhost:8081/empdetailsms/employees/${inputs.id}`, inputs, {
      headers: {
        userId: userId,
      },
    })
  })

export const deleteAddressDetails = createAsyncThunk('deleteAddressDetails',
  async (communId: any) => {
    const response = await axios.delete(
      `http://localhost:8081/empdetailsms/employees/addresses/${communId}`, {
      headers: {
        userId: userId,
      },
    })


  })

export const postEducationalDetails = createAsyncThunk('postEducationalDetails',
  async (data: any) => {
    const response = await axios.post(
      `http://localhost:8081/empdetailsms/employees/${data.empId}/education-details/`
      , data.formFields, {
      headers: {
        userId: userId,
      },
    })
    return response;
  })

export const postBankDetail = createAsyncThunk('postBankDetails',
  async (data: any) => {
    const response = await axios.post(
      `http://localhost:8081/empdetailsms/employees/${data.empId}/bank-details/`
      , data.accoutDetail, {
      headers: {
        userId: userId,
      },
    })
    return response;
  })

export const fetchBankDetails = createAsyncThunk('fetchBankDetails',
  async (empId: any) => {
    const response = await axios.get(
      `http://localhost:8081/empdetailsms/employees/${empId}/bank-details/`)
    return response.data;
  })
export const fetchBankNameDetails = createAsyncThunk('fetchBankNameDetails',
  async () => {
    const response = await axios.get('http://localhost:8081/empdetailsms/employees/bank-names')
    return response.data
  })

export const fetchEducationalDetails = createAsyncThunk('fetchEducationalDetails',
  async (empId: any) => {
    const response = await axios.get(
      `http://localhost:8081/empdetailsms/employees/${empId}/education-details/`)
    return response.data;
  })

export const putEducationalDetails = createAsyncThunk('putEducationalDetails',
  async (data: any) => {
    const response = await axios.put(
      `http://localhost:8081/empdetailsms/employees/${data.empId}/education-details/`
      , data.formFields, {
      headers: {
        userId: userId,
      },
    })
    return response;
  })

export const fetchDegreeTypeDetails = createAsyncThunk('fetchDegreeTypeDetails',
  async () => {
    const response = await axios.get('http://localhost:8081/empdetailsms/employees/degree-types')
    return response.data
  })

export const fetchDepartmentDetails = createAsyncThunk('fetchDepartmentDetails',
  async () => {
    const response = await axios.get('http://localhost:8081/empdetailsms/employees/department-types')
    return response.data
  })

export const putBankDetails = createAsyncThunk('putBankDetails',
  async (data: any) => {

    const response = await axios.put(
      `http://localhost:8081/empdetailsms/employees/${data.empId}/bank-details/`
      , data.input, {
      headers: {
        userId: userId,
      },
    })
    return response;
  })

export const deleteEducationalDetails = createAsyncThunk('deleteEducationalDetails',
  async (data: any) => {
    const response = await axios.delete(
      `http://localhost:8081/empdetailsms/employees/${data.empId}/education-details/${data.educationId}`, {
      headers: {
        userId: userId,
      },
    })
    return response.data;
  })
export const postWorkExperienceDetails = createAsyncThunk('postWorkExperienceDetails',
  async (data: any) => {
    const response = await axios.post(
      `http://localhost:8081/empdetailsms/employees/${data.empId}/organization-details/`, data.formFields, {
      headers: {
        userId: userId,
      },
    })
    return response.data;
  })

export const patchWorkExperienceDetails = createAsyncThunk('patchWorkExperienceDetails',
  async (data: any) => {
    const response = await axios.patch(
      `http://localhost:8081/empdetailsms/employees/${data.empId}/organization-details/`, data.formFields, {
      headers: {
        userId: userId,
      },
    })
    return response.data;
  })

export const fetchWorkExperienceDetails = createAsyncThunk('fetchWorkExperienceDetails',
  async (empId: any) => {
    const response = await axios.get(
      `http://localhost:8081/empdetailsms/employees/${empId}/organization-details/`)
    return response.data;
  })

export const fetchRoleDetails = createAsyncThunk('fetchRoleDetails',
  async () => {
    const response = await axios.get(
      `http://localhost:8081/empdetailsms/employees/role`)
    return response.data;
  })

export const deleteWorkExperienceDetails = createAsyncThunk('deleteWorkExperienceDetails',
  async (data: any) => {
    const response = await axios.delete(
      `http://localhost:8081/empdetailsms/employees/${data.empId}/organization-details/${data.orgId}`, {
      headers: {
        userId: userId,
      },
    })
    return response.data;
  })

export const fetchDropownDetails = createAsyncThunk('fetchDropownDetails',
  async (empId: any) => {
    const response = await axios.get(
      `http://localhost:8081/empdetailsms/employees/${empId}/nominee-details/dropdown-details`)
    return response.data
  })

export const fetchNomineeDetails = createAsyncThunk('fetchNomineeDetails',
  async (empId: any) => {
    const response =
      await axios.get(
        `http://localhost:8081/empdetailsms/employees/${empId}/nominee-details/`)
    return response.data
  })

export const patchNomineeDetails = createAsyncThunk('patchNomineeDetails', async (data: any) => {
  const response =
    await axios.patch(`http://localhost:8081/empdetailsms/employees/${data.empId}/nominee-details/`, data.formFields, {
      headers: {
        userId: userId,
      },
    })
  return response.data
})

export const deleteNomineeDetails = createAsyncThunk('deleteNomineeDetails', async (data: any) => {
  const response =
    await axios.delete(`http://localhost:8081/empdetailsms/employees/${data.empId}/nominee-details/${data.nomineeId}`, {
      headers: {
        userId: userId,
      },
    })
  return response.data
})


export const postContactDetails = createAsyncThunk('postContactDetails',
  async (data: any) => {
    const response = await axios.post(
      `http://localhost:8081/empdetailsms/employees/${data.empId}/contact-details/`, data.formFields, {
      headers: {
        userId: userId,
      },
    })
    return response.data;
  })

export const checkLoginCredentials = createAsyncThunk('checkLoginCredentials',
  async (credentials: any) => {
    console.log(credentials);
    const response = await axios.post(

      `http://localhost:8081/empdetailsms/employees/login/`, credentials, {
      headers: {
        userId: userId,
      },
    })
    return response.data;
  })


export const putContactDetails = createAsyncThunk('patchContactDetails',
  async (data: any) => {
    const response = await axios.patch(
      `http://localhost:8081/empdetailsms/employees/${data.empId}/contact-details/`, data.formFields, {
      headers: {
        userId: userId,
      },
    })
    return response.data;
  })
export const fetchContactDetails = createAsyncThunk('fetchContactDetails',
  async (empId: any) => {
    const response = await axios.get(
      `http://localhost:8081/empdetailsms/employees/${empId}/contact-details/`)
    return response.data;
  })

export const fetchAddressDropdown = createAsyncThunk('fetchAddressDropdown',
  async () => {
    const response = await axios.get(
      `http://localhost:8081/empdetailsms/employees/state-and-district`)
    return response.data;
  })

export const fetchBasicDetailsDropDown = createAsyncThunk('fetchBasicDetailsDropDown',
  async () => {
    const response = await axios.get(
      `http://localhost:8081/empdetailsms/employees/personal-details`)
    return response.data;
  })

const initialState = {
  id: '',
  basicDetails: {},
  bankDetails: {},
  fieldComp: { allMenuDetails },
  educationalDetails: [],
  workExperiencelDetails: [],
  nomineeDetails: {},
  dropdownDetails: [],
  addressDropDown: {},
  activeItem: 'Basic Details',
  bankNames: [],
  checkLoginCredentials: ""
}

const slice = createSlice({
  name: 'basicDetails',
  initialState,
  reducers: {
    nextMenu: (state, action) => {
      state.activeItem = action.payload;
      state.fieldComp = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchBasicDetails.fulfilled, (state: any, action: any) => {
      state.basicDetails = action.payload
    })
    builder.addCase(fetchBasicDetailsId.fulfilled, (state: any, action: any) => {
      state.id = action.payload
    })
    builder.addCase(fetchEducationalDetails.fulfilled, (state: any, action: any) => {
      state.educationalDetails = action.payload
    })
    builder.addCase(fetchDegreeTypeDetails.fulfilled, (state: any, action: any) => {
      state.degreeTypeDetails = action.payload
    })
    builder.addCase(fetchDepartmentDetails.fulfilled, (state: any, action: any) => {
      state.departmentDetails = action.payload
    })
    builder.addCase(fetchBankNameDetails.fulfilled, (state: any, action: any) => {
      state.bankNames = action.payload
    })
    builder.addCase(fetchAddressDropdown.fulfilled, (state: any, action: any) => {
      state.addressDropDown = action.payload
    })
    builder.addCase(fetchBankDetails.fulfilled, (state: any, action: any) => {
      state.bankDetails = action.payload
    })

  },
})

export const { nextMenu } = slice.actions;
export const basicDetails = (state: any) => state.basicDetails;
export const id = (state: any) => state.id;
export const educationalDetails = (state: any) => state.educationalDetails;
export const degreeTypeDetails = (state: any) => state.degreeTypeDetails;
export const activeMenu = (state: any) => state.activeItem;
export const filedItems = (state: any) => state.filedComp;
// console.log(filedItems);
export const departmentDetails = (state: any) => state.departmentDetails;
export const bankNames = (state: any) => state.bankNames;
export const bankDetails = (state: any) => state.bankDetails;
export const addressDropDown = (state: any) => state.addressDropDown;
// export const checkLoginCredentials =(state:any)=>state.
export default slice.reducer;