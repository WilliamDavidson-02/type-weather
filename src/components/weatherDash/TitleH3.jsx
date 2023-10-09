import React from "react";

export default function TitleH3(props) {
  const { title } = props;
  return (
    <h3 className="text-lg md:text-2xl lg:text-3xl lg:font-bold">{title}</h3>
  );
}
