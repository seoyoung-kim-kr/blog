type Props = {
  categories: string[];
  selected: string;
  onClick: (category: string) => void;
};

export default function Categories({ categories, selected, onClick }: Props) {
  const linkClassName =
    "px-3 rounded bg-gray-100 text-sm font-semibold hover:bg-gray-200 h-9 flex items-center transition-colors duration-200 ease-in-out";
  const activedLinkClassName = "bg-pink-50 text-gray-500";

  return (
    <ul className="flex gap-2 pl-30 w-auto bg-gray-100 ">
      {categories.map((category) => {
        const isActive = category === selected;
        return (
          <li
            key={category}
            className={
              isActive
                ? `${linkClassName} ${activedLinkClassName}`
                : linkClassName
            }
            onClick={() => onClick(category)}
          >
            {category}
          </li>
        );
      })}
    </ul>
  );
}
