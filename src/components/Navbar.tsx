import { MdLightMode } from "react-icons/md";
import Link from "next/link";
import { useTheme } from "next-themes";
import { signIn, signOut, useSession } from "next-auth/react";

import { IoLogIn, IoLogOut } from "react-icons/io5";
import { FaUserAstronaut } from "react-icons/fa";

const Navbar = () => {
  const tw_NavbarLinks = "px-4 items-center justify-center cursor-pointer flex";
  const tw_Navbar = "flex justify-between text-2xl p-4 gap-4 dark:bg-[rgb(19,27,46)]";

  const { data: session, status } = useSession();

  const { theme, setTheme } = useTheme();
  return (
    <>
    <div className="sticky w-full top-0 z-10">
      <nav className={tw_Navbar}>
        <i>BTT</i>
        <div className="flex">
          <div className={tw_NavbarLinks}>
            <Link href="/">
              <FaUserAstronaut />
            </Link>
          </div>
          <div className={tw_NavbarLinks}>
            {status === "unauthenticated" && (
              <button onClick={() => signIn()}>
                <IoLogIn />
              </button>
            )}
            {status === "authenticated" && (
              <button onClick={() => signOut()}>
                <IoLogOut />
              </button>
            )}
          </div>
          <div className={tw_NavbarLinks}>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <MdLightMode />
            </button>
          </div>
        </div>
      </nav>
      </div>
    </>
  );
};
export default Navbar;
