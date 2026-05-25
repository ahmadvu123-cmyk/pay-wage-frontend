import Sidebar from "../components/Sidebar"
import "./globals.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import ChatBot from "../components/Chatbot";


export const metadata: Metadata = {
  title: "Pay Wage App",
  description: "This is a pay wage app"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body className="min-h-full flex flex-col">
      <Sidebar />
      <Toaster position="top-right" />
        <div>

          <Header />

          {/* Page Content */}
          <main
            style={{
              marginLeft: "220px",
              minHeight: "calc(100vh - 120px)",
              padding: "20px",
            }}
          >
            {children}
          </main>


          <Footer />


        </div>
        <div className="fixed bottom-4 right-4 z-50">
        <ChatBot />
        </div>
        </body>
      
    </html>
  );
}
