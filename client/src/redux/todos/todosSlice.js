import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodosAsync=createAsyncThunk('todos/getTodoAsync',async ()=> {
    const res=await fetch (`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`);
    return await res.json();
})

export const addTodoAsync=createAsyncThunk('todos/addTodoAsync',async (data)=>{
    const res=await axios.post(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`,data);
    return res.data;
})

export const toggleTodoAsync=createAsyncThunk('todos/toogleTodoAsync',async ({id,data})=>{
    const res=await axios.patch(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`,data);
    return res.data;
})


export const todosSlice=createSlice({
    name:'todos',
    initialState:{
        items:[],
        isLoading:false,
        error:null,
        activeFilter:'all',
        addNewTodoIsLoading:false,
        addNewTodoError:null,
    },
    reducers:{
        // addTodo:{
        //     reducer:(state,action)=>{
        //         state.items.push(action.payload)

        //     },
        //     prepare:({title})=>{
        //         return{
        //             payload:{
        //                 id:nanoid(),
        //                 completed:false,
        //                 title

        //             }

        //         }

        //     }
        // },
        // toggle:(state,action)=>{
        //     const { id } =action.payload;
        //     const item =state.items.find(item =>item.id ===id);
        //     item.completed = !item.completed;

        // },
        destroy:(state,action)=>{
            const id=action.payload;
            const filtered=state.items.filter(item =>item.id !==id);
            state.items=filtered;
        },
        changeActiveFilter:(state,action)=>{
            state.activeFilter= action.payload; 
        },
        clearCompleted:(state)=>{
            const filtered =state.items.filter(item=>item.completed === false)
            state.items=filtered;
        }
    },
    extraReducers:{
        // get todos

        [getTodosAsync.pending]:(state,action)=>{
            state.isLoading=true;
        },
        [getTodosAsync.fulfilled]:(state,action)=>{
            state.items=action.payload;
            state.isLoading=false;
        },
        [getTodosAsync.rejected]:(state,action)=>{
            state.isLoading=false;
            state.error=action.error.message;
        },

        //add todo
        [addTodoAsync.pending]:(state,action)=>{
            state.addNewTodoIsLoading=true;
        },

        [addTodoAsync.fulfilled]:(state,action)=>{
            state.items.push(action.payload);
            state.addNewTodoIsLoading=false;
        },

        [addTodoAsync.rejected]:(state,action)=>{
            state.addNewTodoIsLoading=false;
            state.addNewTodoError=action.error.message;

        },

        //toggle todo
        [toggleTodoAsync.fulfilled]:(state,action)=>{
            console.log(action.payload)
        }


    }

})
export const {toggle,destroy,changeActiveFilter,clearCompleted} = todosSlice.actions;
export default todosSlice.reducer;