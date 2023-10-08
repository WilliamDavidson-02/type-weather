import React from "react";
import LogoLg from "./LogoLg";

export default function ErrorPage() {
  return (
    <div className="w-screen h-screen bg-gray-900 flex flex-col justify-center items-center gap-10">
      <LogoLg />
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-2xl">There has bin an error 🫣</h1>
        <p>Please try reloading the page.</p>
      </div>
    </div>
  );
}
