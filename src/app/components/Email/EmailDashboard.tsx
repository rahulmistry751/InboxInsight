"use client";
import { EmailList, FilterCode } from "../../types/email";
import EmailCard from "./EmailCard";
import EmailDetails from "./EmailDetails";
import Filter from "./Filter";
import Pagination from "../Common/Pagination";
import Icons from "../Common/Icons/Icons";
import { useCallback, useEffect, useState } from "react";
import { useEmailContext } from "@/app/contexts/EmailContext";
import { DEFAULT_SELECTED_EMAIL } from "@/app/constants/email";

const EmailDashboard = () => {
  const [selectedFilter, setSelectedFilter] = useState<FilterCode | string>("");
  const [emailStates, setEmailStates] = useState(() => {
    // Retrieve from localStorage on initial load
    const storedStates = localStorage.getItem("emailStates");
    return storedStates ? JSON.parse(storedStates) : {};
  });
  const [selectedPageNumber, setSelectedPageNumber] = useState(1);
  const { setSelectedEmailDetails, selectedEmailDetails } = useEmailContext();
  const [isLoadingSelectedEmailContent, setIsLoadingSelectedEmailContent] =
    useState<boolean>(false);
  const [emails, setEmails] = useState({ list: [], total: 0 });
  const [areEmailsLoading, setAreEmailsLoading] = useState(false);
  console.log("oitside emails", emails);
  const fetchEmailById = useCallback(async (id: string) => {
    try {
      setIsLoadingSelectedEmailContent(true);
      const response = await fetch(
        `https://flipkart-email-mock.now.sh/?id=${id}`,
        {
          cache: "force-cache",
        }
      );
      const jsonResponse = await response.json();
      setSelectedEmailDetails((prev) => ({
        ...prev,
        body: jsonResponse.body,
      }));
    } catch (error) {
      console.error("Error fetching email:", error);
      setSelectedEmailDetails(DEFAULT_SELECTED_EMAIL);
    } finally {
      setIsLoadingSelectedEmailContent(false);
    }
  }, []);

  const filterEmailBySelectedFilter = (filterCode: FilterCode) => {
    console.log("filterCode in filterEmailBySelectedFilter", filterCode);
    console.log("emails.list in filterEmailBySelectedFilter", emails);
     const modified= emails.list.map(
          (email: EmailList) => {
            
            return email;
          }
        );
        console.log("modif", modified);
    
    // switch (filterCode) {
    //   case FilterCode.FAV:
    //     const modified= emails.list.map(
    //       (email: EmailList) => {
            
    //         return email;
    //       }
    //     );
    //     console.log("modif", modified);
    //     const filteredEmailByFavorite = emails.list.filter(
    //       (email: EmailList) => {
    //         console.log("email check", emailStates[email.id]?.favorite);
    //         return emailStates[email.id]?.favorite || false
    //       }
    //     );
    //     console.log("filteredEmailByFavorite", filteredEmailByFavorite);
    //     // setEmails((prev) => ({ ...prev, list: filteredEmailByFavorite }));
    //     setSelectedFilter(filterCode);
    //     break;
    //   case FilterCode.UNRD:
    //     const filteredEmailByUnread = emails.list.filter(
    //       (email: EmailList) => !emailStates[email.id]?.read
    //     );
    //     setEmails((prev) => ({ ...prev, list: filteredEmailByUnread }));
    //     setSelectedFilter(filterCode);
    //     break;
    //   case FilterCode.RD:
    //     const filteredEmailByRead = emails.list.filter(
    //       (email: EmailList) => emailStates[email.id]?.read
    //     );
    //     setEmails((prev) => ({ ...prev, list: filteredEmailByRead }));
    //     setSelectedFilter(filterCode);
    //     break;
    // }
  };

  const handleMarkAsRead = (emailId: string) => {
    console.log("emailId", emailId);
    setEmailStates((prevStates: any) => {
      const updatedStates = {
        ...prevStates,
        [emailId]: {
          ...prevStates[emailId],
          read: true, // Toggle read status
        },
      };
      localStorage.setItem("emailStates", JSON.stringify(updatedStates)); // Persist to localStorage
      return updatedStates;
    });
  };

  const handleToggleFavorite = (emailId: string) => {
    setEmailStates((prevStates: any) => {
      const updatedStates = {
        ...prevStates,
        [emailId]: {
          ...prevStates[emailId],
          favorite: !prevStates[emailId]?.favorite, // Toggle favorite status
        },
      };
      localStorage.setItem("emailStates", JSON.stringify(updatedStates)); // Persist to localStorage
      return updatedStates;
    });
  };

  const fetchEmailsByPageNumber = async (pageNumber: number) => {
    try {
      console.log("pageNumber", pageNumber);
      setAreEmailsLoading(true);
      setSelectedPageNumber(pageNumber);
      const response = await fetch(
        `https://flipkart-email-mock.now.sh/?page=${pageNumber}`
      );
      const responseInJson = await response.json();
      if (responseInJson) setEmails(responseInJson);
      console.log("response", response);
    } catch (error) {
    } finally {
      setAreEmailsLoading(false);
    }
  };

  const fetchEmails = async () => {
    try {
      setAreEmailsLoading(true);
      const response = await fetch("https://flipkart-email-mock.now.sh/", {
        cache: "no-store",
      });
      const emailResponse = await response.json();
      console.log("emailResponse", emailResponse);
      if (emailResponse) {
        setEmails(emailResponse);
      }
    } catch (error) {
      console.error("Error", error);
    } finally {
      setAreEmailsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div className="grid grid-cols-12 grid-rows-[auto,1fr] px-14 pt-4 pb-6 h-full gap-8">
      <Filter
        onFilterClick={filterEmailBySelectedFilter}
        selectedFilter={selectedFilter as FilterCode}
      />
      {areEmailsLoading ? (
        <div className=" col-span-12 flex justify-center items-center grow">
          <Icons type={"loading"} />
        </div>
      ) : null}
      {!areEmailsLoading ? (
        <section
          className={`${
            selectedEmailDetails?.id ? "col-span-4" : "col-span-12"
          } flex flex-col gap-y-6 mb-6 overflow-hidden`}
        >
          <div className="flex flex-col gap-y-6 pb-3 h-[calc(100vh-11rem)] overflow-y-auto">
            {emails && emails?.list
              ? emails.list.map((email: EmailList) => {
                  return (
                    <EmailCard
                      uniqueEmailId={email.id}
                      key={email.id}
                      fromName={email.from.name}
                      fromEmail={email.from.email}
                      subject={email.subject}
                      description={email.short_description}
                      receivedAt={email.date}
                      isFavorite={emailStates?.[email.id]?.favorite}
                      onCardClick={fetchEmailById}
                      isRead={emailStates?.[email.id]?.read}
                    />
                  );
                })
              : null}
            {!emails?.list?.length ? (
              <div className="flex justify-center items-center grow">
                No Emails found
              </div>
            ) : null}
          </div>
          <div className="flex justify-center grow">
            <Pagination
              count={2}
              onPageClick={fetchEmailsByPageNumber}
              selectedPageNumber={selectedPageNumber}
            />
          </div>
        </section>
      ) : null}
      {(selectedEmailDetails?.id || isLoadingSelectedEmailContent) &&
      !areEmailsLoading ? (
        <EmailDetails
          openedEmailUniqueId={selectedEmailDetails?.id}
          receivedAt={selectedEmailDetails.date}
          body={selectedEmailDetails.body}
          fromName={selectedEmailDetails.fromName}
          isLoading={isLoadingSelectedEmailContent}
          markAsFavorite={handleToggleFavorite}
          isMarkedAsFavorite={emailStates?.[selectedEmailDetails?.id]?.favorite}
          markAsRead={handleMarkAsRead}
        />
      ) : null}
    </div>
  );
};

export default EmailDashboard;
