"use client";

import { useEffect, useState } from "react";
import type { CrmOverview } from "./overview";

type State =
  | { status: "loading"; data: null }
  | { status: "ready"; data: CrmOverview }
  | { status: "error"; data: null; error: string };

let shared: State = { status: "loading", data: null };
let inflight: Promise<void> | null = null;
let lastFetch = 0;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

async function loadOverview(force = false) {
  const now = Date.now();
  if (!force && shared.status === "ready" && now - lastFetch < 15_000) {
    return;
  }
  if (inflight) return inflight;

  inflight = (async () => {
    try {
      const response = await fetch("/api/crm/overview", { cache: "no-store" });
      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(payload?.error ?? `HTTP ${response.status}`);
      }
      const data = (await response.json()) as CrmOverview;
      shared = { status: "ready", data };
      lastFetch = Date.now();
    } catch (error) {
      shared = {
        status: "error",
        data: null,
        error:
          error instanceof Error ? error.message : "Не удалось загрузить данные",
      };
    } finally {
      inflight = null;
      emit();
    }
  })();

  return inflight;
}

export function useCrmOverview(refreshMs = 60_000): State {
  const [state, setState] = useState<State>(shared);

  useEffect(() => {
    const sync = () => setState(shared);
    listeners.add(sync);
    void loadOverview();

    const id = window.setInterval(() => {
      void loadOverview(true);
    }, refreshMs);

    return () => {
      listeners.delete(sync);
      window.clearInterval(id);
    };
  }, [refreshMs]);

  return state;
}
