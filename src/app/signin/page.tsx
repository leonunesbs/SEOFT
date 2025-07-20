import Link from "next/link";
import { SignInForm } from "~/components/organisms/signin-form";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function Login(props: { searchParams: SearchParams }) {
  const { callbackUrl } = await props.searchParams;
  const session = await auth();
  if (session?.user) {
    redirect("/" as string);
  }

  return (
    <div className="relative flex h-screen w-full items-center justify-center px-4">
      <SignInForm callbackUrl={callbackUrl as string} />
      <div className="absolute bottom-0 flex w-full">
        <span className="w-full bg-sidebar-primary py-1 text-center text-xs text-sidebar-primary-foreground">
          Coded with ❤️ by{" "}
          <Link
            href={"https://instagram.com/leonunesbs"}
            className="link font-bold no-underline"
            target="_blank"
          >
            @leonunesbs
          </Link>
        </span>
      </div>
    </div>
  );
}
