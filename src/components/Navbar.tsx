import { MdLightMode } from "react-icons/md";
import Link from "next/link";
import { useTheme } from "next-themes";
import { signIn, signOut, useSession } from "next-auth/react";

import { IoLogOutOutline, IoLogoGoogle } from "react-icons/io5";
import { FaUserAstronaut } from "react-icons/fa";

const Navbar = () => {
  const tw_NavbarLinks =
    "px-4 items-center justify-center cursor-pointer flex sm:hover:text-accent-light transition-colors";
  const tw_Navbar =
    "flex justify-between items-center text-2xl w-full max-w-[90vw] 2xl:max-w-mw p-4";

  const { data: session, status } = useSession();

  // TODO: move links to separate components

  const { theme, setTheme } = useTheme();
  return (
    <nav className="w-full flex items-center justify-center top-0 z-10 bg-secondary-light-bg dark:bg-secondary-dark-bg">
      <div className={tw_Navbar}>
        <Link href="/">
          <p className="cursor-pointer font-bold font-['dancing_script']">BTT</p>
        </Link>
        <ul className="flex">
          <li className={tw_NavbarLinks}>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <MdLightMode />
            </button>
          </li>
          <li className={tw_NavbarLinks}>
            <Link href="/">
              <i>
                <FaUserAstronaut />
              </i>
            </Link>
          </li>
          <li className={tw_NavbarLinks}>
            {status === "unauthenticated" && (
              <button
                className="flex items-center gap-2"
                onClick={() => signIn()}
              >
                <p className="font-light text-lg hidden sm:block">
                  Login with
                </p>
                <IoLogoGoogle />
              </button>
            )}
            {status === "authenticated" && (
              <button onClick={() => signOut()}>
                <IoLogOutOutline size={30} />
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
