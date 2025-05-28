export const UnderlineDecoration = () => {
  return (
    <div className="relative w-10 h-2 mb-2">
      <div
        className="absolute left-0 top-0 h-[5px] bg-blue-600"
        style={{
          width: "100%",
          clipPath: "polygon(0 100%, 85% 100%, 100% 0, 0 0)",
        }}
      />
    </div>
  );
};
