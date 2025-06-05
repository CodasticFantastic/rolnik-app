import { Session } from "next-auth";

export type AuthSessionUser = NonNullable<Session["user"]>;
