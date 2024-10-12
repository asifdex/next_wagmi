

import Header from "@/components/Header/header";
import Footer from "@/components/footer/Footer";
import { ReactNode } from "react";

interface LayoutType{
  children:ReactNode,
  pathname:string
}
const Layout= ( {children,pathname}:LayoutType) => {


  return (
    <div className="">
      <Header/>
        {children}
     <Footer/>
    </div>
  );
};

export default Layout;
