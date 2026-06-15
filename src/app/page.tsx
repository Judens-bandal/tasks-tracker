import { ArrowBigRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum facilis
        molestiae dolorem aliquam id ea architecto aliquid expedita et nulla eos
        asperiores sequi tempora praesentium possimus beatae, quis provident
        cupiditate.
      </h1>

      <Link href="/tasks" className="rounded-full ">
        <ArrowBigRight> Go tooooooo tasks</ArrowBigRight>
      </Link>
    </div>
  );
}
