import Image from "next/image";
import Link from "next/link";
export default function Brand({ onClick }: { onClick?: () => void }) {
  return <Link href="/" onClick={onClick} aria-label="AutoMSP AI Front Desk home" className="brand">
    <Image src="/brand/automsp-light.png" alt="" width={60} height={60} className="brand-seal" />
    <span><strong>AutoMSP</strong><span>AI FRONT DESK</span></span>
  </Link>;
}
