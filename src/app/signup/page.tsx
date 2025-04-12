"use client";

import { signup } from "./actions";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

export default function SignUpPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const result = await signup(formData);

      if (result?.error) {
        setErrorMessage(result.error);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred during login.");
    } finally {
      setIsLoading(false); // End loading regardless of result
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1>SignUp</h1>

      {errorMessage && (
        <div
          className="error-message"
          style={{ color: "red", marginBottom: "1rem" }}
        >
          {errorMessage}
        </div>
      )}

      <form
        action={handleSubmit}
        className="flex flex-col max-w-sm mx-auto gap-4"
      >
        <div>
          <label htmlFor="email" className="mb-1 inline-flex">
            Username:
          </label>

          <Input
            id="username"
            name="username"
            type="text"
            required
            defaultValue=""
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 inline-flex">
            Email:
          </label>

          <Input
            id="email"
            name="email"
            type="email"
            required
            defaultValue="dmitry.shama@faceit.com.ua"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 inline-flex">
            Password:
          </label>

          <Input
            id="password"
            name="password"
            type="password"
            required
            defaultValue="123456"
          />
        </div>

        <div className="flex gap-4 items-center flex-col">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <LoaderCircle className="animate-spin" />}
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
}
