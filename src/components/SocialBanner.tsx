// Package imports
import { FiLinkedin, FiFacebook, FiTwitter } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "next-share";

const SocialBanner: React.FC<{
  title: string;
}> = (props) => {
  // TODO: Make component for individual banner icon
  return (
    <nav className="flex justify-start">
      <div className="flex p-4 justify-evenly items-center gap-4 w-full h-min">
        <FacebookShareButton
          url={window.location.href}
          quote={props.title}
          // TODO: add dynamic hashtags
          // hashtag={"#nextshare"}
        >
          <div className=" lg:hover:text-accent-light lg:hover:-translate-y-1 lg:transition-all">
            <FiFacebook size={24} />
          </div>
        </FacebookShareButton>

        <TwitterShareButton url={window.location.href} title={props.title}>
          <div className=" lg:hover:text-accent-light lg:hover:-translate-y-1 lg:transition-all">
            <FiTwitter size={24} />
          </div>
        </TwitterShareButton>

        <LinkedinShareButton url={window.location.href}>
          <div className=" lg:hover:text-accent-light lg:hover:-translate-y-1 lg:transition-all">
            <FiLinkedin size={24} />
          </div>
        </LinkedinShareButton>

        <WhatsappShareButton
          url={window.location.href}
          title={props.title}
          separator=":: "
        >
          <div className=" lg:hover:text-accent-light lg:hover:-translate-y-1 lg:transition-all">
            <FaWhatsapp size={24} />
          </div>
        </WhatsappShareButton>
      </div>
    </nav>
  );
};

export default SocialBanner;
