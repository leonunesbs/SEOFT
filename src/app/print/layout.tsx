import { auth } from "~/server/auth";
import { redirect } from "next/navigation";

export default async function PrintLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/signin");
  }
  if (!session?.user.isStaff) {
    redirect("/401");
  }
  return (
    <div className="mx-auto my-6 flex w-full max-w-4xl flex-col gap-4 px-4">
      {children}
    </div>
  );
}
