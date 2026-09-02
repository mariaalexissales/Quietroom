import { resources, type ResourceEntry } from "./resources";

export async function GET(request: Request) {
  return Response.json(resources);
}
