import { auth } from "../_lib/auth";

export const metadata = {
  title: "Guest Area",
};

export default async function Page() {
  const session = await auth();
  // console.log(session);
  const fistname = session.user.name.split(" ").at(0);
  return <h2 className="font-semibold text-2xl text-accent-400 mb-7">Welcome, {fistname}</h2>;
}
