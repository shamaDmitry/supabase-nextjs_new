import { login, signup } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <div className="container mx-auto p-4">
      <form className="flex flex-col max-w-sm mx-auto gap-4">
        <div>
          <label htmlFor="email" className="mb-1 inline-flex">
            Email:
          </label>
          <Input id="email" name="email" type="email" required />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 inline-flex">
            Password:
          </label>
          <Input id="password" name="password" type="password" required />
        </div>

        <div className="flex gap-4 items-center flex-col">
          <Button formAction={login}>Log in</Button>
          <Button formAction={signup}>Sign up</Button>
        </div>
      </form>
    </div>
  );
}
