import { auth } from "@/backend/auth/auth";

export default async function Home() {
  const session = await auth();

  console.log("Test", session);

  return (
    <div className="">
      <div>Session Test</div>
    </div>
  );
}
