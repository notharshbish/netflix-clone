import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username : '' , 
    uId : '' , 
    recommendations : [] , 
    myList : []
}


const userSlice = createSlice({
    name : 'user' , 
    initialState , 
    reducers :  {
        setUser: (state , action) => {
            state.username = action.payload.username
            state.uId = action.payload.uId  
            state.recommendations = action.payload.recommendations 
            state.myList = action.payload.myList
        } , 
        setMylist : (state ,action) => {
            state.myList = action.payload
        } , 
        setRecommendations : (state ,action) => {
            state.recommendations = action.payload
        } , 
        setUid : (state,action) => {
            state.uId = action.payload
        } , 
        setLogout : (state,action) => {
            state.username = null 
            state.uId = null 
            state.recommendations = null 
            state.myList = null 
        }
    }
})

export const selectUser = (state) => state
export const selectMylist = (state) => state.myList 
export const selectRecommendations = (state) => state.recommendations
export const selectUid = (state) => state.uId

export const {setUser , setMylist , setUid ,setRecommendations , setLogout} = userSlice.actions

export default userSlice.reducer