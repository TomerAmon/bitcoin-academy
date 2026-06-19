export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 w-full">
      {children}
    </main>
  );
}
