import React from "react";

type Props = {
  title: string;
  icon: React.JSX.Element;
};

export default function CategoryCard({ title, icon }: Props) {
  return (
    <div className="aspect-square grid grid-cols-1 place-content-center">
      {icon}
      <h1 className="text-lg">{title}</h1>
    </div>
  );
}
