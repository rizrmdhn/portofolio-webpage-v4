import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { type session } from "@/server/db/schema";
import { type InferSelectModel } from "drizzle-orm";
import { Info, LaptopMinimal, Smartphone } from "lucide-react";
import moment from "moment-timezone";
import React from "react";
import DeleteSessionForm from "./delete-session-form";

type SessionCardProps = InferSelectModel<typeof session> & {
  currentSessionId: string;
};

export default function SessionCard({
  id,
  os,
  country,
  browser,
  createdAt,
  ip,
  currentSessionId,
}: SessionCardProps) {
  function renderOsIcon() {
    if (
      os.includes("Windows") ||
      os.includes("Linux") ||
      os.includes("macOS")
    ) {
      return <LaptopMinimal className="size-20 self-start" />;
    } else if (os.includes("Android") || os.includes("iPhone")) {
      return <Smartphone className="size-20 self-start" />;
    } else {
      return <Info className="size-20 self-start" />;
    }
  }

  return (
    <Card className="w-96">
      <div className="flex flex-row items-center gap-5 p-5">
        {renderOsIcon()}
        <div className="flex w-full flex-col gap-5">
          <div className="flex flex-row items-center gap-2">
            <p className="flex flex-row items-center gap-2 text-lg font-semibold">
              {os}
            </p>
            {currentSessionId === id ? (
              <Badge variant="destructive">Current</Badge>
            ) : (
              ""
            )}
          </div>
          <p className="flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400">
            {ip}
            <br />
            {country}
            <br />
            {browser}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {moment(createdAt)
              .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
              .format("d/mm/yy, HH:mm")}
          </p>
          <DeleteSessionForm sessionId={id} />
        </div>
      </div>
    </Card>
  );
}
