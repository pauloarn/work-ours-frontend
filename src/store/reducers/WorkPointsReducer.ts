import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, AppDispatch } from "../index";
import api from '../../services/api';
import {toast} from 'react-toastify'

export interface IUserWorkDays{
    id:number,
    name: string,
    hoursToWork: 570,
    workedDays: IWorkedDays []
}

export interface IDataToCreateWorkDay{
    userId: string,
    date: string,
    entry: string,
    lunchLeave: string,
    lunchEntry: string,
    leave: string
}

export interface IWorkedDays{
    id: number,
    date: string,
    entry: string,
    lunchLeave: string,
    lunchEntry: string,
    leave: string,
    workedHours: number,
    employee_id: 1
}
interface IInitialState{
    isCreatingWorkDay: boolean,
    isFetchingUserWorkedDays: boolean,
    userWorkDays: IUserWorkDays | null
}

const initialState:IInitialState = {
    isCreatingWorkDay: false,
    isFetchingUserWorkedDays: false,
    userWorkDays: null
}

const workPointSlice = createSlice({
    name: 'workPointSlice',
    initialState,
    reducers:{
        setIsCreatingWorkDay :(state,{payload}:PayloadAction<boolean>)=>{
           state.isCreatingWorkDay = payload
        },
        setIsFetchingUserWorkedDays: (state, {payload}: PayloadAction<boolean>)=>{
            state.isFetchingUserWorkedDays = payload
        },
        setUserWorkDays: (state, {payload}:PayloadAction<IUserWorkDays | null>)=>{
            state.userWorkDays = payload
        }
    }
})

export const resetUserWork =():AppThunk =>async(dispatch: AppDispatch)=>{
    const {setUserWorkDays} = workPointSlice.actions
    dispatch(setUserWorkDays(null))
}

export const fetchUserWorkDayById = ():AppThunk =>async(dispatch: AppDispatch)=>{
    const { setIsFetchingUserWorkedDays, setUserWorkDays } = workPointSlice.actions
    dispatch(setIsFetchingUserWorkedDays(true))
    try{
        const response = await api.get(`user/workpoint`)
        dispatch(setUserWorkDays(response.data.user))
        dispatch(setIsFetchingUserWorkedDays(false))
    }catch(err){
        dispatch(setIsFetchingUserWorkedDays(false))
        if(err.response){
           toast.error(err.response.data.error)
        }else{
            toast.error(err.message)
        }
    }
}

export const createWorkPointsDate = (data: IDataToCreateWorkDay, cb:Function):AppThunk =>async(dispatch:AppDispatch)=>{
    const {setIsCreatingWorkDay} = workPointSlice.actions
    dispatch(setIsCreatingWorkDay)
    try{
        const response = await api.post('workpoint', data)
        dispatch(setIsCreatingWorkDay(false))
        cb()
        toast.success('Dia de trabalho registrado com sucesso')
    }catch(err){
        dispatch(setIsCreatingWorkDay(false))
        if(err.response){
            toast.error(err.response.data.error)
        }
        else{
            toast.error(err.message)
        }
    }
}

export default workPointSlice.reducer