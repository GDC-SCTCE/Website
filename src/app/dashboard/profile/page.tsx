import ProfileClient from "@/app/dashboard/profile/ProfileClient";
import { verifyUser } from "@/actions/authActions";

export const dynamic = "force-dynamic";

export default function ProfilePage() {
  const userPromise = verifyUser();

  return (
    <ProfileClient userPromise={userPromise as any} />
  );
}
