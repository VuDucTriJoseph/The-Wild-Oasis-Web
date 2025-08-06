"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect, RedirectType } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateProfile(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  // console.log(formData);
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  if (!/^[A-Za-z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID.");
  const updateData = { nationalID, nationality, countryFlag };
  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestID);

  if (error) {
    // console.error(error);
    throw new Error("Guest could not be updated");
  }
  revalidatePath("account/profile");
}

// ////////

export async function deleteReservation(bookingId) {
  // console.log("delete reservation");
  // await new Promise((res) => setTimeout(res, 3000));
  // throw new Error("test");

  const session = await auth();
  if (!session) throw new Error("Not authenticated");

  // Get all bookings for the user
  const guestBookings = await getBookings(session.user.guestID);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("You are not allowed to delete this booking.");
  }

  const { data, error } = await supabase.from("bookings").delete().eq("id", bookingId);

  if (error) {
    // console.error(error);
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("account/reservations");
}

// ////////
export async function updateResservation(formData) {
  // console.log(formData);
  await new Promise((res) => setTimeout(res, 3000));
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const numGuests = +formData.get("numGuests");
  const observations = formData.get("observations")?.slice(0, 1000) || "";
  const bookingId = +formData.get("bookingId");

  const guestBookings = await getBookings(session.user.guestID);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("You are not allowed to update this reservation.");
  }

  const updateBookingData = { numGuests, observations };
  const { data, error } = await supabase
    .from("bookings")
    .update(updateBookingData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    // console.error(error);
    throw new Error("Reservation could not be updated");
  }
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);

  redirect("/account/reservations");
}
