import Image from "next/image";
import Link from "next/link";
export function Header() {
  return (
    <header className="bg-[#0d0131] p-4">
      <div className="flex justify-center items-center gap-4">
        <Link href="/">
          <Image
            src={'/assets/images/header_logo_2024.png'}
            alt="alt"
            width={200}
            height={50}
            className="invert filter"
          />
        </Link>
      </div>
    </header>
  );
}