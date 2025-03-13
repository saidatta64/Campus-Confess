import { Button } from "./button";
import Link from "next/link";
//sticky top-0 bg-[#FFFDF8] border-b-[3px] border-gray-900 z-50
export default function Header() {
  return (
    <header className="h-16 border-b-3 bg-pink-200 border-gray-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-16">
          <h1 className="font-bold text-gray-900 text-3xl cursor-pointer">
            CAMPUSCONFESS
          </h1>
            <Link href={"/signin"} className="space-x-2">
              <Button
                variant="outline"
                className="text-gray-900 border-0 hover:bg-pink-50 hover:border-2 hover:border-sky-700 cursor-pointer"
              >
                Sign in
              </Button>
              <Button
                variant="outline"
                className="text-gray-900 border-0 hover:bg-pink-50 hover:border-2 hover:border-sky-700 cursor-pointer"
              >
                Confess Now
              </Button>
            </Link>
        </div>
      </div>
    </header>
  );
}
