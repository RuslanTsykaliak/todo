import Link from "next/link";

import NextThemeProvider from "./ThemeProvider";
import ThemeSwitch from "./ThemeSwitch";
import { UserButton } from "@clerk/nextjs";

function Header() {

  return (
    <div className="bg-gray-800 p-4 text-white sm:text-sm dark:bg-gray-900 dark:text-gray-50">
      <link rel="manifest" href="/manifest.json" />
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center py-6">
        <div className="flex items-center flex-grow">
          <NextThemeProvider>
            <ThemeSwitch />
          </NextThemeProvider>
        </div>
        <h1 className="text-xl sm:text-3xl font-extrabold uppercase tracking-wide text-blue-500 dark:text-blue-300">
          <Link href={`/`} className="mr-2">Public Todos</Link>
          |
          <Link href={`/your`} className="ml-2">Your Todos</Link>
        </h1>
        <div className="flex items-center flex-grow justify-end">
          <Link
            href={`/add`}
            className="text-md sm:text-lg hover:text-blue-500  dark:hover:text-blue-300 font-extrabold uppercase tracking-wide">
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
