import React from "react";
import AddTodo from "./AddTodo";
import { ThemeProvider } from "./ThemeProvider";
import ThemeSwitch from "./ThemeSwitch";
import Link from "next/link";
import Search from "./SearchComponent";

function Header() {
  return (
    <div className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex flex-col">
          {/* <ThemeProvider> */}
          {/* <ThemeSwitch /> */}
          {/* </ThemeProvider> */}
        </div>
        <h1 className="text-2xl font-bold">
          <Link href={`/`}>Todo App</Link>
        </h1>
        <div className="flex flex-col items-center">
          {/* <AddTodo /> */}
          <Link href={`/add`}>AddTood</Link>
        </div>
      </div>
      {/* <Search /> */}
    </div>
  );
}

export default Header;
