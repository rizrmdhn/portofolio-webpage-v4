"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function ContactForm() {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    setPending(true);
    try {
      console.log("Form data", formData);
      setMessage("Message sent successfully!");
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Card className="p-6">
      <form action={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <Input id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium">
            Message
          </label>
          <Textarea id="message" name="message" required />
        </div>
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Sending..." : "Send Message"}
        </Button>
        {message && (
          <p className="mt-4 text-center text-sm text-muted-foreground">
            {message}
          </p>
        )}
      </form>
    </Card>
  );
}
