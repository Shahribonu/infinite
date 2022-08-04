import React,{useEffect} from "react";
import numberSlice from "./numberSlice";
import { fetchNumbers } from "./numberSlice";


import { useSelector,useDispatch } from "react-redux";

export const NumberView = ()=>{
    const number = useSelector(state=>state.number)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchNumbers())
    },[])

    return (
        <div>
         <div>
             <h2>List of Numbers</h2>
                {number.loading && <div>Loading...</div>}
                {!number.loading && number.error ? <div>Error: {number.error}</div> : null}
                {!number.loading && number.numbers.length ? (
             <ul>
               {number.numbers.map(number => (
                 <li key={number.id}>{number.title}</li>
                ))}
            </ul>
           ) : null}
         </div>
        </div>
    )

}