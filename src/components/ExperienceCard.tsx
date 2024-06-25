import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { type ExperienceElement } from "@/types/expereince";

export default function ExperienceCard({
  title,
  company,
  type,
  description,
  date,
}: ExperienceElement) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {company} | {type} | {date}
        </CardDescription>
      </CardHeader>
      <CardContent>{description}</CardContent>
    </Card>
  );
}
