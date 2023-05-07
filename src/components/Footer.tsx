import React from "react";

const repoUrl = "https://www.github.com/hicks-team/arc/";
const siteUrl = "https://ehicks.net";

const Footer = () => {
  return (
    <footer className="flex justify-end p-4 gap-4">
      <Link href={repoUrl}>github</Link>
      <Link href={siteUrl}>ehicks</Link>
    </footer>
  );
};

interface LinkProps {
  href: string;
  children: React.ReactNode;
}
const Link = ({ href, children }: LinkProps) => {
  return (
    <a
      href={href}
      className="text-blue-400 hover:underline hover:text-blue-600 visited:text-purple-600"
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
};

export default React.memo(Footer);
