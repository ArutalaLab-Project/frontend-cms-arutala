"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatedDate } from "@/shared/utils/date";

type RecentMessagesProps = {
  messages: {
    message_id: string;
    sender_name: string;
    sender_email: string;
    subject: string[];
    created_date: string;
  }[];
};

export function RecentMessages({ messages }: RecentMessagesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Messages</CardTitle>
        <CardDescription>Latest incoming messages</CardDescription>
      </CardHeader>

      <CardContent className="space-y-2">
        {messages.map((msg) => (
          <div key={msg.message_id} className="flex flex-col gap-2 border-b pb-2 last:border-0">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">{msg.sender_name}</p>
                <p className="text-xs text-muted-foreground">{msg.sender_email}</p>
              </div>

              <span className="text-xs text-muted-foreground">{formatedDate(msg.created_date)}</span>
            </div>

            <div className="flex flex-wrap gap-3">
              {msg.subject.map((subj, i) => (
                <Badge key={i} variant="secondary">
                  {subj}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
