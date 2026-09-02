import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/components/Header";
import Timer from "@/components/Timer";
import Toolbar from "@mui/material/Toolbar";
import QuickExitListener from "@/components/QuickExitListener";

export default function Home() {
  return (
    <>
      <QuickExitListener />
      <Header />
      <Toolbar />
      <Timer />
    </>
  );
}
