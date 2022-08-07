import Link from "next/link";

import { FiGithub, FiLinkedin  } from "react-icons/fi";

const SocialBanner = () => {
  return (
    <nav className="fixed w-fit bottom-0 right-0 mx-8 py-8 z-10">
      <div className="grid gap-4">
        <Link  href="/">
          <div className="cursor-pointer">
            <FiGithub size={24}/>
          </div>
        </Link>
        <Link href="/">
          <div className="cursor-pointer">
            <FiLinkedin size={24}/>
          </div>
        </Link>
      </div>
    </nav>
  );
};
export default SocialBanner;
