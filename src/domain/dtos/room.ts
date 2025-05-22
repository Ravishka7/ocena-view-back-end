import { z } from "zod";

export const CreateRoomDTO = z.object({
  name: z.string(),
  image: z.string(),
  description: z.string(),
  price: z.string(),
});