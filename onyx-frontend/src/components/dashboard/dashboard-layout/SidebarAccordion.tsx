import { FC } from "react";
import { Link } from "@tanstack/react-router";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionData } from "./types";

interface SidebarAccordionProps {
  data: AccordionData[];
}

const SidebarAccordion: FC<SidebarAccordionProps> = ({ data }) => {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      {data.map((accData) => (
        <AccordionItem
          value={accData.title.label}
          className="border-b-0"
          key={accData.title.label}
        >
          <AccordionTrigger className="rouded-l-full pl-8 pr-4 hover:rounded-l-full hover:text-foreground xl:pl-9">
            <span className="space-x-4 overflow-hidden">
              <accData.title.Icon className="inline-flex size-6 shrink-0" />
              <span className="inline-flex text-sm font-semibold tracking-wide">
                {accData.title.label}
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col space-y-2 py-2">
            {accData.links.map(({ label, ...linkProps }) => (
              <Link
                key={label}
                className="w-full rounded-l-full py-4 pl-9 text-sm font-semibold transition-all duration-300 hover:bg-accent hover:text-foreground"
                activeProps={{
                  className: "bg-background text-foreground",
                }}
                {...linkProps}
              >
                {label}
              </Link>
            ))}
            {accData.additionalContent}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default SidebarAccordion;
