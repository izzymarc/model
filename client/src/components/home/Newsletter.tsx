import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const newsletterSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

const Newsletter = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: NewsletterFormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/newsletter", data);
      toast({
        title: t("newsletter.success.title", "Subscription Successful"),
        description: t("newsletter.success.message", "Thank you for subscribing to my newsletter!"),
      });
      reset();
    } catch (error) {
      toast({
        title: t("newsletter.error.title", "Subscription Error"),
        description: t("newsletter.error.message", "There was a problem with your subscription. Please try again later."),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="newsletter" className="full-page-section py-20 bg-accent">
      <div className="container mx-auto px-4 text-center">
        <motion.h2 
          className="font-playfair text-3xl md:text-4xl text-neutral-900 mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t("newsletter.title", "Join My Newsletter")}
        </motion.h2>
        <motion.p 
          className="text-neutral-800 max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t("newsletter.description", "Subscribe to my newsletter for updates on my latest projects, upcoming events, and exclusive content.")}
        </motion.p>
        
        <motion.form 
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex-grow relative">
            <input 
              type="email" 
              placeholder={t("newsletter.emailPlaceholder", "Your email address")}
              className="w-full p-3 border border-neutral-300 focus:border-neutral-900 focus:outline-none"
              {...register("email")}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p className="absolute text-red-600 text-sm text-left mt-1">{errors.email.message}</p>
            )}
          </div>
          <button 
            type="submit"
            className="px-8 py-3 bg-neutral-900 hover:bg-neutral-800 transition-colors duration-300 text-white font-medium uppercase tracking-wider text-sm"
            disabled={isSubmitting}
          >
            {isSubmitting ? t("newsletter.subscribing", "Subscribing...") : t("newsletter.subscribe", "Subscribe")}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Newsletter;
