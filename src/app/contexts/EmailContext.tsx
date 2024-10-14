"use client"
import { createContext,  Dispatch,  SetStateAction,  useContext,  useState } from "react";
import { Filter } from "../types/email";
import { FILTERS } from "../constants/filters";

interface EmailContextValue {
  selectedEmail: string;
  setSelectedEmail: Dispatch<SetStateAction<string>>;
  filters: Filter[];
  setFilters: Dispatch<SetStateAction<Filter[]>>;
}


export const EmailContext = createContext<EmailContextValue| null>(null);


export const EmailContextProvider = ({
  children,
}: {
  children: React.ReactNode;
  value?: EmailContextValue;
}) => {
  const [selectedEmail, setSelectedEmail] = useState("");
  const [filters, setFilters] = useState(FILTERS);
  return (
    <EmailContext.Provider
      value={{ setSelectedEmail, selectedEmail, filters, setFilters }}
    >
      {children}
    </EmailContext.Provider>
  );
};

export const useEmailContext=()=>{
    const value= useContext(EmailContext)
    if(value){
        return value
    }
    throw new Error('useEmailContext should be called in components which are under ContextProvider')
}