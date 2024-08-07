import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function ProjectCardLoader() {
  return (
    <Card className="flex max-h-[600px] flex-col justify-between">
      <CardHeader className="flex flex-col gap-4">
        <Skeleton className="aspect-[3/2] h-[200px] w-full overflow-hidden rounded-xl object-cover hover:cursor-pointer" />
        <CardTitle>
          <Skeleton className="h-6 w-24" />
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-4 flex flex-col items-start gap-4">
        <Skeleton className="h-3 w-full" />
      </CardContent>
      <CardFooter className="flex flex-col items-start justify-start gap-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-5 w-5" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>
        <div className="flex w-full justify-between">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-24" />
        </div>
      </CardFooter>
    </Card>
  );
}
