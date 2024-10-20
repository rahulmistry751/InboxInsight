"use client";
import { EmailList, EmailStates, FilterCode } from "../../types/email";
import EmailCard from "./EmailCard";
import EmailDetails from "./EmailDetails";
import Filter from "./Filter";
import Pagination from "../Common/Pagination";
import Icons from "../Common/Icons/Icons";
import { useCallback, useEffect, useState } from "react";
import { DEFAULT_SELECTED_EMAIL } from "@/app/constants/email";

const EmailDashboard = () => {
  const [selectedFilter, setSelectedFilter] = useState<FilterCode | string>("");
  const [emailStates, setEmailStates] = useState(() => {
    // Retrieve from localStorage on initial load
    if (typeof window !== "undefined") {
      const storedStates = localStorage.getItem("emailStates");
      return storedStates ? JSON.parse(storedStates) : {};
    }
    return {};
  });
  const [selectedPageNumber, setSelectedPageNumber] = useState(1);
  const [ selectedEmailDetails,setSelectedEmailDetails ] = useState(DEFAULT_SELECTED_EMAIL);
  const [isLoadingSelectedEmailContent, setIsLoadingSelectedEmailContent] =
    useState<boolean>(false);
  const [originalEmails, setOriginalEmails] = useState({ list: [], total: 0 });
  const [emails, setEmails] = useState({ list: [], total: 0 });
  const [areEmailsLoading, setAreEmailsLoading] = useState(false);

  const fetchEmailById = useCallback(
    async (id: string,receivedAt: string,fromEmail: string,fromName: string,subject: string,body: string) => {
      try {
        setIsLoadingSelectedEmailContent(true);
        setSelectedEmailDetails({id,date:receivedAt,fromEmail,fromName,body,subject})
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
    },
    [setSelectedEmailDetails]
  );

  const filterEmailBySelectedFilter = useCallback(
    (filterCode: FilterCode) => {
      setSelectedFilter(filterCode)
      if (filterCode === FilterCode.FAV) {
        const filteredEmail = originalEmails.list.filter(
          (email: EmailList) => emailStates?.[email?.id]?.favorite
        );
        setEmails({ list: filteredEmail, total: filteredEmail.length });
      } else if (filterCode === FilterCode.UNRD) {
        const filteredEmail = originalEmails.list.filter(
          (email: EmailList) => !emailStates?.[email?.id]?.read
        );
        setEmails({ list: filteredEmail, total: filteredEmail.length });
      } else if (filterCode === FilterCode.RD) {
        const filteredEmail = originalEmails.list.filter(
          (email: EmailList) => emailStates?.[email?.id]?.read
        );
        setEmails({ list: filteredEmail, total: filteredEmail.length });
      }
    },
    [emails, emailStates]
  );

  const handleMarkAsRead = useCallback((emailId: string) => {
    setEmailStates((prevStates: EmailStates) => {
      const updatedStates = {
        ...prevStates,
        [emailId]: {
          ...prevStates[emailId],
          read: true,
        },
      };
      // Persist to localStorage
      localStorage.setItem("emailStates", JSON.stringify(updatedStates)); 
      return updatedStates;
    });
  }, []);

  const handleToggleFavorite = (emailId: string) => {
    setEmailStates((prevStates: EmailStates) => {
      const updatedStates = {
        ...prevStates,
        [emailId]: {
          ...prevStates[emailId],
          // Toggle favorite status
          favorite: !prevStates[emailId]?.favorite,
        },
      };
      localStorage.setItem("emailStates", JSON.stringify(updatedStates)); // Persist to localStorage
      return updatedStates;
    });
  };

  const fetchEmailsByPageNumber = useCallback(async (pageNumber: number) => {
    try {
      setAreEmailsLoading(true);
      setSelectedPageNumber(pageNumber);
      const response = await fetch(
        `https://flipkart-email-mock.now.sh/?page=${pageNumber}`
      );

      const responseInJson = await response.json();
      if (responseInJson) {
        setEmails(responseInJson)
        setOriginalEmails(responseInJson)
        setSelectedEmailDetails(DEFAULT_SELECTED_EMAIL)
      };
    } catch (error) {
      console.error("Error fetching emails", error);
    } finally {
      setAreEmailsLoading(false);
    }
  }, []);

  const fetchEmails = async () => {
    try {
      setAreEmailsLoading(true);
      const response = await fetch("https://flipkart-email-mock.now.sh/", {
        cache: "no-store",
      });
      const emailResponse = await response.json();;
      if (emailResponse) {
        setEmails(emailResponse);
        setOriginalEmails(emailResponse)
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
            {emails?.list?.length
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
