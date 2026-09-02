export type Region = "US" | "CA" | "UK" | "IE" | "AU";

type ResourceEntry = {
  region: string;
  label: string;
  call: string;
  text?: string;
  note?: string;
};

export const resources: ResourceEntry[] = [
  {
    region: "US",
    label: "National Domestic Violence Hotline",
    call: "1-800-799-7233",
    text: "START to 88788",
    note: "24/7",
  },
  {
    region: "UK",
    label: "National Domestic Abuse Helpline",
    call: "+44 0808 2000 247",
    note: "Chatbot available on their website. Support via BSL available 10am - 6pm Monday to Friday BST",
  },
  {
    region: "CA",
    label: "VictimLinkBC",
    call: "1-800-563-0808",
    note: "Toll-free nationally; originally an Ontario based service.",
  },
  {
    region: "AU",
    label: "White Ribbon Australia",
    call: "1800RESPECT",
    note: "24/7 National hotline. They also developed the 'Daisy' app for access to local support services and search the internet privately.",
  },
  {
    region: "IE",
    label: "Safe Ireland",
    call: "1800 341 900",
    note: "24/7 Helpline",
  },
];
