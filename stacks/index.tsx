import useUserProfile from "@/store/useUserProfile";
import { useQueryClient } from "@tanstack/react-query";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function AppStacks() {
  const router = useRouter();
  const { token } = useUserProfile();

  useEffect(() => {
    /* -------------------------- CHECK AUTHENTICATION -------------------------- */
    if (!token) {
      router.replace("/auth/login");
    } else {
      router.replace("/home");
    }
  }, [token]);
  /* -------------------------------------------------------------------------- */
  /*                            ADD MORE SCREENS HERE                           */
  /* -------------------------------------------------------------------------- */
  return (
    <Stack>
      <Stack.Screen
        name="auth"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(main)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
}
