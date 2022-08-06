import { MdLightMode } from "react-icons/md";
import Link from "next/link";
import { useTheme } from "next-themes";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const tw_NavbarLinks = "px-4 items-center justify-center flex";
  const tw_Navbar =
    "flex justify-between text-2xl p-4";

    const { data: session, status } = useSession();

  const { theme, setTheme } = useTheme();
  return (
    <>
      <nav className={tw_Navbar}>
        <i>BTT</i>
        <div className="flex">
          <div className={tw_NavbarLinks}>
            <Link href="/">About</Link>
          </div>
          <div className={tw_NavbarLinks}>
          {(status === 'unauthenticated') && <button onClick={() => signIn()}>SignIn</button>}
        {(status === 'authenticated') && <button onClick={() => signOut()}>SignOut</button>}
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
    </>
  );
};
export default Navbar;
