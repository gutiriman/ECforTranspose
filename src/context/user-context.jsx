import { useEffect, createContext, useReducer } from "react";

import FirebaseAuthService from "../firebase/FirebaseAuthService";

export const UserContext = createContext;

const authReducer = (state, action) => {
   switch (action.type) {
      case 'LOGIN':
         return {
            ...state,
            user: {
               id: action.userRef.id,
               ...action.userRef.data()
            }
         }
      default:
         return state
   }
}