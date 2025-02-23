import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ExperienceCardProps {
  title: string;
  company: string;
  period: string;
  description: string | null;
}

export default function ExperienceCardV2({
  title,
  company,
  period,
  description,
}: ExperienceCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {company} | {period}
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{description}</p>
      </CardContent>
    </Card>
  );
}
