import { ROUTES } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  imageSrc: string;
  imageDesc: string;
  height?: number;
  width?: number;
}

const Logo = ({ imageSrc, imageDesc, height, width }: LogoProps) => {
  return (
    <Link href={ROUTES.DEFAULT} className="flex items-center">
      <Image
        src={imageSrc}
        alt={imageDesc}
        height={height ?? 40}
        width={width ?? 40}
        className=" p-1 rounded-full invert-100"
      />
    </Link>
  );
};

export { Logo };
