interface SectionHeaderProps {
  title: string;
  maskImage?: string;
}

export const SectionHeader = ({
  title,
  maskImage = "/mask-group.svg",
}: SectionHeaderProps) => {
  return (
    <div className="flex items-center mb-4">
      <h2 className="text-[22px] font-bold text-[#183354]">{title}</h2>
      <div className="flex-1 ml-4 border-t border-b border-[#dfdfdf] h-[5px] relative">
        <div className="absolute top-0 left-0 w-10 h-[5px] bg-[#f4796c]"></div>
        <img
          className="absolute top-0 left-9 w-2.5 h-1.5"
          alt="Mask group"
          src={maskImage}
        />
      </div>
    </div>
  );
};
