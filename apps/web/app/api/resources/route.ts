type ResourceEntry = {
  region: string;
  label: string;
  call: string;
  text?: string;
  note?: string;
};

const placeholderRessources: ResourceEntry[] = [
  {
    region: "US",
    label: "National Domestic Violence Hotline",
    call: "1-800-799-7233",
    text: "START to 88788",
  },
];

export async function GET(request: Request) {
  return Response.json(placeholderRessources);
}
