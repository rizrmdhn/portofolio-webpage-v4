import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { type Experiences } from "@/types/expereince";
import { Briefcase, GraduationCap, LaptopMinimal } from "lucide-react";

type ExperienceCardProps = Experiences & {
  position: 0 | 1;
};

export default function ExperienceCard({
  name,
  company,
  type,
  description,
  date,
  position,
}: ExperienceCardProps) {
  const renderWorkType = () => {
    if (type === "work") {
      return (
        <Briefcase className="hidden xl:block xl:text-black xl:dark:text-white" />
      );
    } else if (type === "freelance") {
      return (
        <LaptopMinimal className="hidden xl:block xl:text-black xl:dark:text-white" />
      );
    } else {
      return (
        <GraduationCap className="hidden xl:block xl:text-black xl:dark:text-white" />
      );
    }
  };

  return (
    <div className="flex h-full w-full">
      {position === 0 && (
        <div className="hidden xl:flex xl:flex-1 xl:items-center xl:justify-end">
          <div className="hidden xl:relative xl:block xl:h-full xl:w-1 xl:bg-black xl:dark:bg-white">
            <div className="hidden xl:absolute xl:left-1/2 xl:top-1/2 xl:block xl:-translate-x-1/2 xl:-translate-y-1/2 xl:transform">
              <div className="hidden rounded-full border-2 border-black bg-white p-2 dark:border-white dark:bg-black xl:block">
                {renderWorkType()}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-1 pb-5 pt-5">
        <Card className="mx-auto flex w-full max-w-lg flex-row">
          <div className="flex w-full flex-col">
            <CardHeader>
              <CardTitle>{name}</CardTitle>
              <CardDescription>
                {company} | {type} | {date}
              </CardDescription>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </div>
        </Card>
      </div>
      {position === 1 && (
        <div className="hidden xl:-ml-2 xl:flex xl:flex-1 xl:items-center">
          <div className="hidden xl:relative xl:block xl:h-full xl:w-1 xl:bg-black xl:dark:bg-white">
            <div className="hidden xl:absolute xl:left-1/2 xl:top-1/2 xl:block xl:-translate-x-1/2 xl:-translate-y-1/2 xl:transform">
              <div className="hidden border-2 border-black p-2 dark:border-white xl:block xl:rounded-full xl:bg-white xl:dark:bg-black">
                {renderWorkType()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
