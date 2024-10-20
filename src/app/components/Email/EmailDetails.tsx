import { useEffect } from "react";
import Avatar from "../Common/Avatar";
import Button, { ButtonVariant } from "../Common/Button";
import Icons from "../Common/Icons/Icons";

interface EmailDetailsProps {
  openedEmailUniqueId: string;
  receivedAt: string;
  body: string;
  fromName: string;
  isLoading: boolean;
  markAsFavorite: (emailId: string) => void;
  isMarkedAsFavorite: boolean;
  markAsRead: (emailId: string) => void;
}

const EmailDetails = ({
  openedEmailUniqueId,
  receivedAt,
  fromName,
  body,
  isLoading,
  markAsFavorite,
  isMarkedAsFavorite,
  markAsRead,
}: EmailDetailsProps) => {

  useEffect(() => {
    if (!isLoading) {
      markAsRead(openedEmailUniqueId);
    }
  }, [openedEmailUniqueId, isLoading, markAsRead]);
  
  return (
    <section className="bg-white col-span-8 border-[1px] border-neutralLight rounded-md p-6 flex flex-row gap-6 mb-6">
      {isLoading ? (
        <div className="flex justify-center items-center grow">
          <Icons type={"loading"} />
        </div>
      ) : null}
      {!isLoading ? (
        <>
          <Avatar name={fromName} />
          <section className="flex flex-col gap-8 mr-8">
            <header className="flex">
              <div className="flex justify-between grow">
                <div className=" flex flex-col gap-y-4">
                  <h3 className="text-2xl font-semibold">{fromName}</h3>
                  <p className="text-xs">{receivedAt}</p>
                </div>
                {!isMarkedAsFavorite ? (
                  <Button
                    variant={ButtonVariant.filled}
                    label={"Mark as favorite"}
                    onClick={() => markAsFavorite(openedEmailUniqueId)}
                  />
                ) : null}
              </div>
            </header>
            <article
              className="overflow-y-auto h-[calc(100vh-18rem)]"
              dangerouslySetInnerHTML={{ __html: body }}
            ></article>
          </section>
        </>
      ) : null}
    </section>
  );
};

export default EmailDetails;
