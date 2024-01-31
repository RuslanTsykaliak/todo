import Link from "next/link";

import NextThemeProvider from "./ThemeProvider";
import ThemeSwitch from "./ThemeSwitch";
import { UserButton } from "@clerk/nextjs";

function Header() {

  return (
    <div className="bg-gray-800 p-4 text-white text-sm dark:bg-gray-900 dark:text-gray-50">
      <link rel="manifest" href="/manifest.json" />
      <div className="container mx-auto flex md:flex-row justify-between items-center py-6">
        <div className="flex justify-start items-center w-full md:w-auto mb-4 md:mb-0">
          <NextThemeProvider>
            <ThemeSwitch />
          </NextThemeProvider>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-start md:items-center w-full md:w-auto">
          <h1 className="text-xl md:text-3xl font-extrabold uppercase tracking-wide text-blue-500 dark:text-blue-300 md:mr-2">
            <Link href={`/`}>Public Todos</Link>
          </h1>
          <h1 className="text-xl md:text-3xl font-extrabold uppercase tracking-wide text-blue-500 dark:text-blue-300 ml-1 md:ml-2">
            <Link href={`/your`}>Your Todos</Link>
          </h1>
        </div>
        <div className="flex justify-end items-center w-full md:w-auto mt-4 md:mt-0">
          <Link
            href={`/add`}
            className="text-md md:text-lg hover:text-blue-500  dark:hover:text-blue-300 font-extrabold uppercase tracking-wide">
            Add Todo
          </Link>
          <div className="items-end pl-4">
            <UserButton />
          </div>
        </div>
      </div>
    </div>
)




}

export default Header;
