"use client"
import { createContext,  Dispatch,  SetStateAction,  useContext,  useState } from "react";
import { Filter, SelectedEmail } from "../types/email";
import { FILTERS } from "../constants/filters";
import { DEFAULT_SELECTED_EMAIL } from "../constants/email";

interface EmailContextValue {
  selectedEmail: string;
  setSelectedEmail: Dispatch<SetStateAction<string>>;
  filters: Filter[];
  setFilters: Dispatch<SetStateAction<Filter[]>>;
  setSelectedEmailDetails: Dispatch<
    SetStateAction<SelectedEmail>
  >;
  selectedEmailDetails: SelectedEmail;
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
  const [selectedEmailDetails, setSelectedEmailDetails] =
    useState<SelectedEmail>(DEFAULT_SELECTED_EMAIL);
  return (
    <EmailContext.Provider
      value={{
        setSelectedEmail,
        selectedEmail,
        filters,
        setFilters,
        setSelectedEmailDetails,
        selectedEmailDetails,
      }}
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