import "./globals.css";
import { Open_Sans } from "next/font/google";
import Nabar from "@/components/Nabar";
import AuthContext from "@/context/AuthContext";
import SWRConfigContext from "@/context/SWRConfigContext";
import { Metadata } from "next";
import PathProvider from "@/context/PathContext";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Instantgram",
    template: "Instantgram | %s",
  },
  description: "Instantgram Photos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={openSans.className}>
      <body className="w-full bg-neutral-50 overflow-auto ">
        <AuthContext>
          <PathProvider>
            <header className="sticky top-0 bg-white z-10 border-b">
              <div className="max-w-screen-xl mx-auto">
                <Nabar />
              </div>
            </header>
            <main className="w-full flex justify-center max-w-screen-xl mx-auto">
              <SWRConfigContext>{children}</SWRConfigContext>
            </main>
          </PathProvider>
        </AuthContext>
        <div id="portalNode"></div>
      </body>
    </html>
  );
}
