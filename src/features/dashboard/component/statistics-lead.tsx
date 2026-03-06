import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "@/components/ui/item";

export type StatisticItem = {
  title: string;
  number: string | number;
  suffix?: string;
};

type StatisticsLeadProps = {
  data: StatisticItem[];
};

export function StatisticsLead({ data }: StatisticsLeadProps) {
  return (
    <div className="w-full">
      <ItemGroup className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((item) => (
          <Item key={item.title} variant="outline" className="bg-card">
            <ItemContent className="items-center py-6">
              <ItemTitle className="text-muted-foreground font-medium">{item.title}</ItemTitle>
              <ItemDescription className="text-2xl font-bold">
                {item.number}
                {item.suffix}
              </ItemDescription>
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    </div>
  );
}
