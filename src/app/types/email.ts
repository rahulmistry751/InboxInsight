interface Filter {
  id: string;
  name: string;
  code: FilterCode;
  isSelected: boolean;
}

interface EmailFrom{
  email: string;
  name: string;
}

interface EmailList {
  id: string;
  from: EmailFrom;
  date: number;
  subject: string;
  short_description: string;
}

interface SelectedEmail {
  fromName: string;
  fromEmail: string;
  date: string;
  subject: string;
  body: string;
  id: string;
}

enum FilterCode {
  "UNRD"="UNRD",
  "RD"="RD",
  "FAV"="FAV"
}


export { type Filter, type EmailList, type SelectedEmail, FilterCode };
