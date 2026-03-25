import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerAPI, loginAPI, generateOtp, verifyOtp, getMeAPI, logoutAPI } from '../../API/Auth/authAPI';

// Async thunks
export const adminRegisterThunk = createAsyncThunk(
  'auth/adminRegister',
  async (data, { rejectWithValue }) => {
    try {
      const response = await registerAPI(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const adminLoginThunk = createAsyncThunk(
  'auth/adminLogin',
  async (data, { rejectWithValue }) => {
    try {
      const response = await loginAPI(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const adminGenerateOtpThunk = createAsyncThunk(
  'auth/generateOtp',
  async (_, { rejectWithValue }) => {
    try {
      const response = await generateOtp();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to generate OTP');
    }
  }
);

export const adminVerifyOtpThunk = createAsyncThunk(
  'auth/verifyOtp',
  async (data, { rejectWithValue }) => {
    try {
      const response = await verifyOtp(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Invalid OTP');
    }
  }
);

export const getMeThunk = createAsyncThunk(
  'auth/getMe',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getMeAPI();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
    }
  }
);

export const adminLogoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutAPI();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    checked: false, // Initial auth check
    error: null,
    otpSent: false,
    isVerified: false,
    message: null,
  },
  reducers: {
    clearAuthStates: (state) => {
      state.error = null;
      state.message = null;
    },
    resetOtpState: (state) => {
      state.otpSent = false;
    },
    resetVerifyState: (state) => {
      state.isVerified = false;
    },
    logout: (state) => {
      state.user = null;
      state.isVerified = false;
      state.otpSent = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(adminRegisterThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminRegisterThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(adminRegisterThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(adminLoginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLoginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(adminLoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Generate OTP
      .addCase(adminGenerateOtpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.otpSent = false;
      })
      .addCase(adminGenerateOtpThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = true;
        state.message = action.payload.message;
      })
      .addCase(adminGenerateOtpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Verify OTP
      .addCase(adminVerifyOtpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isVerified = false;
      })
      .addCase(adminVerifyOtpThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isVerified = true;
        state.message = action.payload.message;
      })
      .addCase(adminVerifyOtpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Me
      .addCase(getMeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.checked = true;
        state.user = action.payload.user;
      })
      .addCase(getMeThunk.rejected, (state) => {
        state.loading = false;
        state.checked = true;
        state.user = null;
      })
      // Logout
      .addCase(adminLogoutThunk.fulfilled, (state) => {
        state.user = null;
        state.isVerified = false;
        state.otpSent = false;
      });
  },
});

export const { clearAuthStates, logout, resetOtpState, resetVerifyState } = authSlice.actions;
export default authSlice.reducer;