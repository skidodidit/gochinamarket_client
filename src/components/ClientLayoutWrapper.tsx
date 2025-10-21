"use client";

import React, { useEffect } from "react";
import { useGlobalStore } from "@/store/useGlobalStore";
import type { Contact, Settings } from "@/types";

export default function ClientLayoutWrapper({
  children,
  contacts,
  settings,
}: {
  children: React.ReactNode;
  contacts: Contact[] | null;
  settings: Settings | null;
}) {
  const { setContacts, setSettings } = useGlobalStore();

  useEffect(() => {
    if (contacts?.length) setContacts(contacts[0]);
    if (settings) setSettings(settings);
  }, [contacts, settings, setContacts, setSettings]);

  return <>{children}</>;
}
