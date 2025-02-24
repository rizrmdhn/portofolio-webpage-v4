import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";

import { Poppins } from "next/font/google";
import Providers from "@/app/provider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/server/uploadthing";
import { TRPCReactProvider } from "@/trpc/react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "My Portfolio",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  // modal,
  sheet,
}: {
  children: React.ReactNode;
  // modal: React.ReactNode;
  sheet: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.className}`} suppressHydrationWarning>
      <body>
        <TRPCReactProvider>
          <NextSSRPlugin
            /**
             * The `extractRouterConfig` will extract **only** the route configs
             * from the router to prevent additional information from being
             * leaked to the client. The data passed to the client is the same
             * as if you were to fetch `/api/uploadthing` directly.
             */
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          <Providers>
            {children}
            {/* {modal} */}
            {sheet}
            <div id="modal-root" />
            <div id="sheet-root" />
            <Toaster />
          </Providers>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
