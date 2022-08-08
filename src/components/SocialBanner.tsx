import Link from "next/link";

import { FiGithub, FiLinkedin, FiMail  } from "react-icons/fi";

const SocialBanner = () => {
  return (
    <nav className="md:fixed w-full md:w-fit md:bottom-0 md:right-0 py-8 px-8 z-10">
      <div className="flex justify-center md:grid gap-4">
        <Link  href="https://github.com/sarthak22gaur">
          <div className="cursor-pointer sm:hover:text-accent-light sm:hover:-translate-y-1 transition-all">
            <FiGithub size={24}/>
          </div>
        </Link>
        <Link href="https://www.linkedin.com/in/sarthak-gaur-22041998/">
          <div className="cursor-pointer sm:hover:text-accent-light sm:hover:-translate-y-1 transition-all">
            <FiLinkedin size={24}/>
          </div>
        </Link>
        <Link href="https://www.linkedin.com/in/sarthak-gaur-22041998/">
          <div className="cursor-pointer sm:hover:text-accent-light sm:hover:-translate-y-1 transition-all">
            <FiMail size={24}/>
          </div>
        </Link>
      </div>
    </nav>
  );
};
export default SocialBanner;
