// Package imports
import { useEffect } from "react";
import { useRouter } from "next/router";
import Countdown from "react-countdown";

const ErrorPage = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 5000);
  }, [router]);
  return (
    <>
      <div className="flex flex-col p-8 gap-8 items-center justify-center h-full text-center">
        <p className="text-9xl sm:text-[20em] text-[#ffffff07] absolute z-0">
          404
        </p>
        <p className="text-xl z-10">No such resource available</p>
        <p className="text-xl flex items-center justify-center">
          You will be automatically redirected in{" "}
          <Countdown
            date={Date.now() + 5000}
            renderer={(props) => (
              <span className="font-bold text-accent-light text-3xl px-2">
                {props.seconds}
              </span>
            )}
          ></Countdown>
          seconds
        </p>
        <a
          className="cursor-pointer z-10 px-6 py-2 text-lg bg-primary-light rounded lg:hover:bg-secondary-light-bg lg:transition-colors"
          onClick={handleClick}
        >
          Return to home
        </a>
      </div>
    </>
  );
};

export default ErrorPage;
