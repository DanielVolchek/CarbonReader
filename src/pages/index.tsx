import FileWrapper from "@/components/FileWrapper";
import LoginInput from "@/components/LoginInput";
import { InferGetServerSidePropsType } from "next";
import { useState } from "react";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
export default function Home({ PASSWORD }: Props) {
  const [loggedIn, setLoggedIn] = useState(false);

  // log in user
  const login = (password: string) => {
    if (password === PASSWORD) {
      setLoggedIn(true);
    } else {
      alert("Wrong password");
    }
  };

  if (PASSWORD === undefined)
    return <h1>Please set the PASSWORD environment variable in .env file</h1>;

  if (!loggedIn) {
    return <LoginInput login={login} />;
  }

  return (
    <main className="h-screen w-screen flex flex-col justify-center items-center bg-slate-600">
      <h1 className="text-white text-4xl text-center mb-4">
        Remote File Explorer
      </h1>
      <FileWrapper />
    </main>
  );
}

export async function getServerSideProps() {
  const PASSWORD = process.env.PASSWORD;

  // Pass data to the page via props
  return { props: { PASSWORD } };
}
