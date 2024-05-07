import Image from "next/image";
import AddBlog from "./pages/AddBlog/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <AddBlog/>
    </main>
  );
}
