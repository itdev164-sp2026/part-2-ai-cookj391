import React from "react";
import type { ComponentType, SVGProps } from "react";

type SkillCardProps = {
  title: string;
  description?: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const SkillCard: React.FC<SkillCardProps> = ({ title, description, Icon }) => {
  return (
    <div className="group rounded-lg border border-border bg-card p-4 transform transition-transform duration-200 group-hover:-translate-y-1">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
          <Icon className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      {description && (
        <p className="text-sm text-muted-foreground max-h-0 overflow-hidden opacity-0 -translate-y-1 transform transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-hover:max-h-40 mt-2">
          {description}
        </p>
      )}
    </div>
  );
};

export default SkillCard;
