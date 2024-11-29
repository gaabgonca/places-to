"use client"

import "@/app/globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import localFont from "next/font/local";
import SuggestPlaceModal from "@/components/SuggestPlaceModal";
import { useState } from "react";

const montrealMedium = localFont({
  src: "../../public/PPNeueMontreal-Medium.otf",
  variable: "--montreal",
});

interface HeaderProps {
  onOpenModal: () => void;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [modalOpen, setModalOpen] = useState(false);

  const headerProps: HeaderProps = {
    onOpenModal: () => setModalOpen(true),
  };
  return (
    <>
      <html>
        <body>
      <div
        className={`flex flex-col isolate min-h-full ${montrealMedium.className}`}
      >
        <Head>
          <link
            rel="icon"
            href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌳</text></svg>"
            />
        </Head>
        <Header {...headerProps} />
          <main>{children}</main>
        <Footer />
        <SuggestPlaceModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
        </body>

      </html>
    </>
  );
}
