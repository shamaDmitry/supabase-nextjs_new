import { navMenu } from "@/src/routerList";
import { createClient } from "@/src/utils/supabase/server";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";

const Navbar = async () => {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const isLoggedIn = !!session;

  return (
    <nav className="flex items-center justify-between w-full px-4 py-2 bg-gray-100 shadow-md">
      {navMenu
        .filter((item) => !item.isProtected || (item.isProtected && isLoggedIn))
        .map(({ id, name, path }) => (
          <Link
            key={id}
            href={path}
            className="text-sm/6 tracking-[-.01em] hover:text-blue-500"
          >
            {name}
          </Link>
        ))}

      <div className="flex items-center gap-4">
        {!isLoggedIn && (
          <Link
            href={"/login"}
            className="text-sm/6 tracking-[-.01em] hover:text-blue-500"
          >
            Login
          </Link>
        )}

        {!isLoggedIn && (
          <Link
            href={"/signup"}
            className="text-sm/6 tracking-[-.01em] hover:text-blue-500"
          >
            Sign up
          </Link>
        )}
      </div>

      {isLoggedIn && (
        <div>
          <form action="/api/auth/signout" method="post">
            <Button type="submit">Sign out</Button>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
