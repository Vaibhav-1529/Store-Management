import { getuserFromcookies } from "@/HelperFunc/helperFun";
import Header from "@/components/Header";
import UserCtx from "@/components/contextProvider/UserCtx";
import { redirect } from "next/navigation";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
    <UserCtx >
      <Header/>
        {children}
    </UserCtx>
      </>
  );
}
