import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header"
import React from "react";

const Page = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#fafafa]">
      <Header />
      <div className="h-[160px] bg-[#76A0B5]" />
      {children}
      <Footer />
    </div>
  )
}

export default Page;