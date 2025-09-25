import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header"
import React from "react";

const Page = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#fafafa]">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Page;