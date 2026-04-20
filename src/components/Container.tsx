import React from "react";

export default function Container({
  className = "",
  children,
}: Readonly<{
  className?: string;
  children: React.ReactNode;
}>) {
  return <div className={`px-30 py-7 ${className}`}>{children}</div>;
}
