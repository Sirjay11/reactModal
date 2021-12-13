import React, { useContext, useState } from "react";
import Cookies from "js-cookie";

export const StateContext = React.createContext();

export function useStateContext() {
  return useContext(StateContext);
}

export function EMProvider({ children }) {
  const [modalOpen, setModalOpen] = useState(false);
  const openModalAction = () => {
    Cookies.set("modalOpenedBefore", true, { expires: 7 });
    setModalOpen(true);
  };
  const closeModalAction = () => {
    setModalOpen(false);
  };

  const [email, setEmail] = useState("");
  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };
  const [showEmailError, setShowEmailError] = useState(false)
  const checkForEmail = (e) => {
   function emailIsValid(text){
    return /\S+@\S+\.\S+/.test(text)
   }
   if(!emailIsValid(email)){
    setShowEmailError(true)
   }
    console.log('Checking for email')
  }
  const removeErrorMessage = (e) => {
   setShowEmailError(false)
    console.log("remove error");
  };
  const [formCompleted, setFormCompleted] = useState(false);
  const submittedForm = (e) => {
   e.preventDefault()
   if(showEmailError===false && email.length > 5){
    setFormCompleted(true)
    setTimeout(() => {
     closeModalAction()
    },3000)

    
   }
    
  }

  return (
    <StateContext.Provider
      value={{
        modalOpen,
        email,
        handleEmailInput,
        openModalAction,
        closeModalAction,
        checkForEmail,
        removeErrorMessage,
        showEmailError,
        submittedForm,
        formCompleted
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

export default EMProvider;
