import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

type ContactInput = z.infer<typeof api.contact.create.input>;

export function useCreateContactMessage() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: ContactInput) => {
      // Validate input before sending
      const validated = api.contact.create.input.parse(data);
      
      const res = await fetch(api.contact.create.path, {
        method: api.contact.create.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        let errorMsg = "Failed to send message.";
        try {
          const errData = await res.json();
          const parsedErr = api.contact.create.responses[400].safeParse(errData);
          if (parsedErr.success) {
            errorMsg = parsedErr.data.message;
          }
        } catch (e) {
          // fallback to generic message
        }
        throw new Error(errorMsg);
      }

      return api.contact.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
