import Header from "@/components/layout/Header";
import ChatClient from "@/components/ui/ChatClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ישראביט AI | הזהב החדש",
  description: "שאל את ישראביט — הבינה המלאכותית שלנו — כל שאלה על ביטקוין וכלכלה בעברית",
};

export default function ChatPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-[72px] min-h-screen flex flex-col">
        <ChatClient />
      </main>
    </>
  );
}
