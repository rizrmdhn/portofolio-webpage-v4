"use client";

import { api } from "@/trpc/react";
import React, { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export default function ChatPage() {
  const [isDeleted, setIsDeleted] = useState(new Set());

  const utils = api.useUtils();
  const [latestMessages] = api.message.list.useSuspenseQuery();

  const { mutate } = api.message.delete.useMutation({
    onMutate: (variable) => {
      setIsDeleted((prev) => new Set([...prev, variable.id]));
    },
    onSuccess: async (data) => {
      await utils.message.list.invalidate();

      toast({
        title: "Success",
        description: "Message deleted successfully",
      });

      setIsDeleted((prev) => {
        const next = new Set(prev);
        next.delete(data.id);
        return next;
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

  return (
    <ScrollArea className="max-h-[calc(97vh-12rem)]">
      <div className="space-y-4">
        {latestMessages.length === 0 ? (
          <div className="flex h-[calc(97vh-16rem)] items-center justify-center">
            <p className="text-muted-foreground">No messages yet.</p>
          </div>
        ) : (
          latestMessages.map((message) => (
            <Card
              key={message.id}
              className="cursor-pointer transition-colors hover:bg-muted/50"
            >
              <CardContent className="pt-4">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarFallback>
                      {message.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div>
                      <h3 className="font-semibold">{message.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(message.created_at), "PPpp")}
                      </p>
                    </div>
                    <div className="rounded-lg bg-muted p-3">
                      <p className="text-sm">{message.message}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button
                  variant="destructive"
                  onClick={() => mutate({ id: message.id })}
                  disabled={isDeleted.has(message.id)}
                >
                  {isDeleted.has(message.id) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}{" "}
                  Delete
                </Button>
                <Button>Mail</Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </ScrollArea>
  );
}
