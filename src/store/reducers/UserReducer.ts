import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, AppDispatch } from "../index";
import api from '../../services/api';
import {toast} from 'react-toastify'

interface IUser{
    id: number,
    name: string,
    hoursToWork: number
}

interface IInitialState{
    isCreatingSession: boolean
    isFetchingUser: boolean;
    currentUser: IUser | null;
    isCreatingUser: boolean;
    isPrimaryUser: boolean;
    isAwakingServer: boolean
}

const initialState:IInitialState ={
    isCreatingSession: false,
    isFetchingUser: false,
    currentUser: null,
    isCreatingUser: false,
    isPrimaryUser: false,
    isAwakingServer: false
}

const userSlice = createSlice({
    name:'usersSlice',
    initialState,
    reducers:{
        setIsAwakingServer:(state, {payload}:PayloadAction<boolean>)=>{
            state.isAwakingServer= payload
        },
        setIsPrimaryUser:(state, {payload}:PayloadAction<boolean>)=>{
            state.isPrimaryUser = payload
        },
        setIsCreatingUser:(state, {payload}:PayloadAction<boolean>)=>{
            state.isCreatingUser = payload
        },
        setIsCreatingSession:(state, {payload}:PayloadAction<boolean>)=>{
            state.isCreatingSession = payload
        },
        setIsFetchingUser:(state, {payload}:PayloadAction<boolean>)=>{
            state.isFetchingUser = payload
        },
        setCurrentUser:(state, {payload}:PayloadAction<IUser | null>)=>{
            state.currentUser = payload
        }
    }
})

    export const awakeServer = (): AppThunk =>async(dispatch: AppDispatch)=>{
        const {setIsAwakingServer} = userSlice.actions
        dispatch(setIsAwakingServer(true))
        await api.get('')
        dispatch(setIsAwakingServer(false))    
    }

    export const createUserSession = ({
        userId,
        password,
        onSuccess
    }:{
        userId:Number, 
        password:string,
        onSuccess: Function
    }): AppThunk =>async(dispatch: AppDispatch)=>{
            const {setIsCreatingSession} = userSlice.actions;
            dispatch(setIsCreatingSession(true))
            try{
                const url = `sessions`
                const response = await api.post(`${url}`,{
                    userId: userId,
                    password: password
                })
                dispatch(setIsCreatingSession(false))
                toast.success(`Bem vindo ${response.data.user.name}`)
                localStorage.setItem('@token', response.data.token)
                onSuccess()
            }catch(err){
                dispatch(setIsCreatingSession(false))
                if(err.response){
                    toast.error(err.response.data.error)
                }else{
                    toast.error(err.message)
                }
            }
    }

    export const createUser = ({
        name,
        password,
        hoursToWork
    }:{
        name: string,
        password: string,
        hoursToWork: string
    }): AppThunk=> async (dispatch: AppDispatch)=>{
        const {setIsCreatingUser} = userSlice.actions
        dispatch(setIsCreatingUser(true))
        try{
            const url = `users`
            const response = await api.post(url, {
                name: name,
                password: password,
                hoursToWork: hoursToWork
            })
            dispatch(setIsCreatingUser(false))
            toast.success(`Usuário criado com sucesso, Id para Login: ${response.data.data.id}`)
        }catch(err){
            dispatch(setIsCreatingUser(false))
            toast.error(err.message)
        }
    }

export default userSlice.reducer