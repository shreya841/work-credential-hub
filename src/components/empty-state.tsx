import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <Card className="border-dashed border-border/60">
      <CardContent className="grid place-items-center py-16">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-xl bg-muted text-muted-foreground">
          <Icon className="h-7 w-7" />
        </div>
        <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
        <p className="mt-2 max-w-sm text-center text-sm text-muted-foreground">{description}</p>
        {actionLabel && onAction && (
          <Button
            onClick={onAction}
            className="mt-6 bg-gradient-hero text-primary-foreground shadow-elegant"
          >
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
