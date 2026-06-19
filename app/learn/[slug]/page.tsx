import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LessonClient from "@/components/learn/LessonClient";

const demoLesson = {
  title: "שיעור 1: מהו כסף? — ההיסטוריה של הערך",
  description:
    "בשיעור זה נסקור את התפתחות הכסף מהחלפת סחורות ועד למערכת הפיאט המודרנית, ונבין מדוע ביטקוין מהווה את הצעד האבולוציוני הבא.",
  course: "יסודות הביטקוין",
  duration: "45:00",
  progress: "14:20",
  content: [
    "כסף אינו המצאה, אלא טכנולוגיה שהתפתחה כדי לפתור את בעיית 'אי-ההתאמה של הרצונות' בסחר חליפין. לאורך ההיסטוריה, סחורות שונות שימשו ככסף, אך הטובות ביותר שרדו בזכות תכונות מסוימות: נדירות, ניידות, עמידות, חלוקה וניתנות לזיהוי.",
    "ב-1971, נשיא ארה\"ב ריצ'רד ניקסון 'ניתק' את הדולר מהזהב. לפני כן, כל דולר היה מגובה בכמות קבועה של זהב. אחרי הניתוק — הדולר הפך לנייר בלבד, מגובה רק על ידי אמון בממשלה האמריקאית. זה מה שנקרא 'כסף פיאט'.",
    "מאז 1971 איבד הדולר כ-97% מכוח הקנייה שלו. שקל שנשמר בבנק ב-2000 שווה פחות ממחצית ממה שהיה שווה אז. ביטקוין נועד לתקן בדיוק את הבעיה הזו — עם היצע קבוע של 21 מיליון מטבעות, שלא ניתן לשנות לעולם.",
  ],
  keyPoints: [
    "כסף הוא אמון, לא חומר",
    "3 תפקידי כסף: חליפין, שמירת ערך, יחידת חשבון",
    "ניתוק מהזהב ב-1971 = כסף ללא עוגן",
    "ביטקוין: 21M מקסימום — קבוע בקוד לנצח",
  ],
};

const playlist = [
  { order: 1, title: "שיעור 1: מהו כסף?", duration: "45:00", status: "current" as const },
  { order: 2, title: "שיעור 2: בעיית הגנרלים הביזנטיים", duration: "32:15", status: "completed" as const },
  { order: 3, title: "שיעור 3: כרייה וקונצנזוס", duration: "41:20", status: "locked" as const },
  { order: 4, title: "שיעור 4: עסקאות ועמלות", duration: "38:10", status: "locked" as const },
];

export default function LessonPage({ params }: { params: { slug: string } }) {
  return (
    <>
      <Header />
      <main className="flex-1 pt-[72px]">
        <LessonClient lesson={demoLesson} playlist={playlist} />
      </main>
      <Footer />
    </>
  );
}
