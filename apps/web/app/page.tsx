import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/components/Header";
import Timer from "@/components/Timer";
import Toolbar from "@mui/material/Toolbar";

export default function Home() {
  return (
    <>
      <Header />
      <Toolbar />
      <Timer />
    </>
  );
}
