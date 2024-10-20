"use client";
import { useEmailContext } from "@/app/contexts/EmailContext";
import formatTimestamp from "../../utils/getDateInFormat";
import Avatar from "../Common/Avatar";

interface EmailCardProps {
  uniqueEmailId: string;
  fromName: string;
  fromEmail: string;
  subject: string;
  description: string;
  receivedAt: number;
  isFavorite?: boolean;
  isRead?: boolean;
  onCardClick: (id: string) => void;
}

const EmailCard = ({
  uniqueEmailId,
  fromName,
  fromEmail,
  subject,
  description,
  receivedAt,
  isFavorite,
  isRead,
  onCardClick,
}: EmailCardProps) => {
  const { setSelectedEmailDetails } = useEmailContext();
  return (
    <div
      className={`border-[1px] border-neutralLight rounded-md py-2 px-6 flex gap-6  ${
        isRead ? "bg-backgroundAccent1" : "bg-white"
      }`}
      onClick={() => {
        setSelectedEmailDetails({
          date: formatTimestamp(receivedAt),
          fromEmail,
          fromName,
          id: uniqueEmailId,
          subject,
          body: "",
        });
        onCardClick(uniqueEmailId);
      }}
    >
      <section>
        <Avatar name={fromName} />
      </section>
      <section>
        From: <span className="font-semibold break-words">{fromName}</span>{" "}
        <span className="font-semibold break-words">
          <span className="break-words">{`<${fromEmail}>`}</span>
        </span>
        <div>
          Subject: <span className="font-semibold break-words">{subject}</span>
        </div>
        <div className="my-2 break-words">{description}</div>
        <div className="flex gap-x-8 items-baseline flex-wrap gap-y-4">
          {receivedAt ? formatTimestamp(receivedAt) : ""}{" "}
          {isFavorite && (
            <span className="text-primary text-xs font-semibold">Favorite</span>
          )}
        </div>
      </section>
    </div>
  );
};

export default EmailCard;
