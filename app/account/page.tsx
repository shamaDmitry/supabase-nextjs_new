import AccountForm from "@/components/pages/account/account-form";
import { createClient } from "@/utils/supabase/server";

const AccountPage = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <h1>AccountPage</h1>

      <AccountForm user={user} />
    </div>
  );
};

export default AccountPage;
