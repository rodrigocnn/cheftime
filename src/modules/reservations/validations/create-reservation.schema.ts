import { z } from "zod";

// schema que converte string ISO para Date
export const createReservationSchema = z.object({
  dateTime: z.preprocess(
    (val) => {
      if (typeof val === "string" || val instanceof Date) {
        const date = new Date(val);
        if (!isNaN(date.getTime())) return date;
      }
      return val;
    },
    z.date({ error: "Data e hora inválidas" })
  ),
  status: z.boolean({ error: "Status deve ser verdadeiro ou falso" }),
  clientId: z.uuid({ error: "ID do cliente inválido" }),
});
