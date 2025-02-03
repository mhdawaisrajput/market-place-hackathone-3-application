import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#FFFFFF] border-[1px] border-[#C3D4E966] mx-auto max-w-screen-2xl mt-auto p-6">
      <div className="grid md:grid-cols-3 gap-8 md:px-12">
        <div>
          <h1 className="text-[#3563E9] font-bold text-[32px] leading-[48px] mb-4">
            MORENT
          </h1>
          <p className="text-[#13131399] font-medium text-[16px] leading-[24px]">
            Our vision is to provide convenience and help increase your sales business.
          </p>
        </div>

        <div>
          <h2 className="text-[#1A202C] font-semibold text-[20px] leading-[30px] mb-4">
            About
          </h2>
          <ul className="space-y-4">
            <li>
              <Link href={""} className="text-[#13131399] font-medium text-[16px]">
                How it works
              </Link>
            </li>
            <li>
              <Link href={""} className="text-[#13131399] font-medium text-[16px]">
                Featured
              </Link>
            </li>
            <li>
              <Link href={""} className="text-[#13131399] font-medium text-[16px]">
                Partnership
              </Link>
            </li>
            <li>
              <Link href={""} className="text-[#13131399] font-medium text-[16px]">
                Business Relation
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-[#1A202C] font-semibold text-[20px] leading-[30px] mb-4">
            Community
          </h2>
          <ul className="space-y-4">
            <li>
              <Link href={""} className="text-[#13131399] font-medium text-[16px]">
                Events
              </Link>
            </li>
            <li>
              <Link href={""} className="text-[#13131399] font-medium text-[16px]">
                Blog
              </Link>
            </li>
            <li>
              <Link href={""} className="text-[#13131399] font-medium text-[16px]">
                Podcast
              </Link>
            </li>
            <li>
              <Link href={""} className="text-[#13131399] font-medium text-[16px]">
                Invite a friend
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-[#1A202C] font-semibold text-[20px] leading-[30px] mb-4">
            Socials
          </h2>
          <ul className="space-y-4">
            <li>
              <Link href={""} className="text-[#13131399] font-medium text-[16px]">
                Discord
              </Link>
            </li>
            <li>
              <Link href={""} className="text-[#13131399] font-medium text-[16px]">
                Instagram
              </Link>
            </li>
            <li>
              <Link href={""} className="text-[#13131399] font-medium text-[16px]">
                Twitter
              </Link>
            </li>
            <li>
              <Link href={""} className="text-[#13131399] font-medium text-[16px]">
                Facebook
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between text-[#1A202C] text-[16px] mt-6">
        <p>©2022 MORENT. All rights reserved</p>
        <div className="flex space-x-6">
          <Link href={""} className="text-[#13131399]">Privacy & Policy</Link>
          <Link href={""} className="text-[#13131399]">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
