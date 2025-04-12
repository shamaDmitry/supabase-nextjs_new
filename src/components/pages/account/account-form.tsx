"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/src/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  // const [avatar_url, setAvatarUrl] = useState<string | null>(null);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      // const { data, error, status } = await supabase
      //   .from("auth.users")
      //   .select(`*`)
      //   .eq("user_id", user?.id)
      //   .single();

      const { data, error, status } = await supabase
        .from("profiles")
        .select("*");

      console.log({ data, error, status });

      // if (error && status !== 406) {
      //   console.log(error);

      //   throw error;
      // }

      // if (data) {
      //   setFullname(data.full_name);
      //   setUsername(data.username);
      //   setWebsite(data.website);
      //   setAvatarUrl(data.avatar_url);
      // }
    } catch (error) {
      console.log("Error loading user data!", error);
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    username,
    website,
  }: // avatar_url,
  {
    username: string | null;
    fullname: string | null;
    website: string | null;
    // avatar_url: string | null;
  }) {
    try {
      setLoading(true);

      const { error } = await supabase.from("users").upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        // avatar_url,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;

      alert("Profile updated!");
    } catch (error) {
      console.log("Error updating the data!", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget max-w-xs mx-auto">
      <div>
        <label htmlFor="email">Email</label>
        <Input id="email" type="text" value={user?.email} disabled />
      </div>

      <div>
        <label htmlFor="fullName">Full Name</label>
        <Input
          id="fullName"
          type="text"
          value={fullname || ""}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <Input
          id="username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <Input
          id="website"
          type="url"
          value={website || ""}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <Button
          className="button primary block"
          onClick={() =>
            updateProfile({
              fullname,
              username,
              website,
              // avatar_url
            })
          }
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </Button>
      </div>
    </div>
  );
}
