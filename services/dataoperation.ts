"use server";

import { auth } from "@/lib/firebase";

export async function fetchProductById(id: string, token: string) {
  fetch(`http://localhost:4000/products/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  }).then(async (res) => {
    const data = await res.json();
    console.log(data);
  });
}
