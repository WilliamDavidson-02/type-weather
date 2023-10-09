import React from "react";

export default function IconBtn(props) {
  const { icon, href } = props;
  return (
    <a
      className="cursor-pointer p-4 bg-gray-600 rounded-lg hover:bg-gray-500 transitions duration-300"
      href={href}
    >
      {icon}
    </a>
  );
}
