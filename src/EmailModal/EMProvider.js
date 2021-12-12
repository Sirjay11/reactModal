import React, { useContext, useState } from "react";
import Cookies from "js-cookie";

export const StateContext = React.createContext();

export function useStateContext() {
  return useContext(StateContext);
}

export function EMProvider({ children }) {
 const openModalAction = ()=>{
  Cookies.set("modalOpenedBefore", true, { expires: 7 });
  setNewState({
    ...newState,
    modalOpen: true
  })
 }
 const closeModalAction = () => {
   setNewState({
     ...newState,
     modalOpen: false,
   });
 };
 const handleEmailInput = (e) => {
   setNewState({
     ...newState,
     email: e.target.value
   });
 };
 const [newState, setNewState] = useState({
  email: '',
  modalOpen: false,
  openModalAction,
  closeModalAction,
  handleEmailInput

 })

 return(
  <StateContext.Provider value={newState}>
   {children}
  </StateContext.Provider>
 )
}

export default EMProvider;

