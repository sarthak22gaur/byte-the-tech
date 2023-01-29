// Package imports
import Typewriter from "typewriter-effect";
import GraphemeSplitter from "grapheme-splitter";

const optionsText = [
  "TypeScript",
  "React",
  "Node.js",
  "Next.js",
  "SQL",
  "TailwindCSS",
  "tRPC",
  "Zod",
  "SuperJSON",
  "Prisma"
];

const HomeHeader = () => {
  return (
    <header className="w-full py-12 flex justify-center items-center bg-secondary-light-bg dark:bg-secondary-dark-bg">
      <div className="max-w-mw w-full flex flex-col justify-center items-center px-8 gap-8">
        <h1 className="w-fit text-center text-6xl sm:text-7xl lg:text-8xl font-bold px-8">
          Byte the Tech
        </h1>
        <h2 className="w-min text-4xl sm:text-5xl lg:text-6xl px-8 text-accent-light">
          <TypeAnimate options={[...optionsText]} />
        </h2>
      </div>
    </header>
  );
};

const TypeAnimate: React.FC<{ options: Array<string> }> = (props) => {
  const stringSplitter = (text: string) => {
    const splitter = new GraphemeSplitter();
    const splitString = splitter.splitGraphemes(text);
    return splitString as unknown as string;
  };

  return (
    <Typewriter
      options={{
        strings: [...props.options],
        autoStart: true,
        cursor: ".",
        delay: 150,
        deleteSpeed: 50,
        loop: true,
        stringSplitter,
      }}
    />
  );
};
export default HomeHeader;
