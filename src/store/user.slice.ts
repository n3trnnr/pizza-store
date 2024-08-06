import { createAsyncThunk, createSlice, PayloadAction, UnknownAction } from "@reduxjs/toolkit";
import { getState } from "./localStorage/localStorage";
import { PREFIX, TOKEN_PERSISTENT_STATE, USERID_PERSISTENT_STATE } from "../constants/constants";
import { IFormdata, IUserData } from "../interfaces/interfaces";
import { RootState } from "./store";

interface IRegisterUser {
    accessToken: string,
    user: IUserData,
}
interface ILoginUser {
    accessToken: string,
    user: IUserData
}

export interface IInitialState {
    token: string | null,
    error: string | null,
    status: string | null,
    user: IUserData
}

const initialState: IInitialState = {
    //Токен устанавливается при регистрации пользователя, далее берется из localstorage 
    //Получиение токена при первичном запуске (инициализации) проекта.
    //Функция getToken отрабатывается при первичной загрузке страницы, так же как первично реднерядся компоненты 
    token: getState(TOKEN_PERSISTENT_STATE) || null,
    error: null,
    status: '',
    user: {
        email: undefined,
        id: getState(USERID_PERSISTENT_STATE) ?? null,
        name: undefined,
    }
}

export const registerUser = createAsyncThunk<IRegisterUser, IFormdata, { rejectValue: string }>(
    'user/registerUser',
    async (formData, { rejectWithValue, dispatch }) => {
        const res = await fetch(`${PREFIX}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        if (!res.ok) {
            throw rejectWithValue(await res.json())
        }

        const data = await res.json() as IRegisterUser
        dispatch(setUserId(data.user.id))
        return data
    })


export const loginUser = createAsyncThunk<ILoginUser, IFormdata, { rejectValue: string }>(
    'user/loginUser',
    async (formData, { rejectWithValue, dispatch }) => {
        const res = await fetch(`${PREFIX}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })

        if (!res.ok) {
            throw rejectWithValue(await res.json())
        }

        const data = await res.json() as ILoginUser
        dispatch(setUserId(data.user.id))
        return data
    })

export const getUserProfile = createAsyncThunk<IUserData, number, { rejectValue: string, state: RootState }>(
    'user/getUserProfile',
    async (id, { rejectWithValue, getState }) => {
        const res = await fetch(`${PREFIX}/users/${id}`, {
            headers: {
                Authorization: `Bearer ${getState().user.token}`
            }
        });

        if (!res.ok) {
            throw rejectWithValue(await res.json())
        }
        const data = await res.json() as IUserData
        return data
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearError(state) {
            state.error = null
        },
        clearStatus(state) {
            state.status = null
        },
        setUserId(state, action) {
            state.user.id = action.payload
        },
        logout(state) {
            state.token = null
            state.user = { email: undefined, id: null, name: undefined }
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                state.token = action.payload.accessToken
                state.error = ''
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload.accessToken
                state.error = ''
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.user = action.payload
                state.error = ''
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload
            })
    }
})

export default userSlice.reducer
export const { clearError, clearStatus, setUserId, logout } = userSlice.actions

//Функция предикат, возвращет boolen. Принимает в качестве аргумента один из типов .addCase.действие
//Если действие совпадает с rejected возвращает true.
function isError(action: UnknownAction) {
    return action.type.endsWith('rejected');
}