import { useState, useEffect } from "react";
export function useGuestId() {
  const [guestId, setGuestId] = useState<string>('');

  useEffect(() => {
    let id = localStorage.getItem("guestId");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("guestId", id);
    }
    setGuestId(id);
  }, []);

  return guestId;
}
