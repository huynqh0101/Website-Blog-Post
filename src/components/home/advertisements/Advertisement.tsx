interface AdvertisementProps {
  image: string;
  className?: string;
}

export const Advertisement = ({
  image,
  className = "w-full h-[120px]",
}: AdvertisementProps) => {
  return (
    <div
      className={`${className} bg-cover bg-center`}
      style={{ backgroundImage: `url(${image})` }}
    />
  );
};
