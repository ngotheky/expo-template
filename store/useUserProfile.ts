import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { asyncStorage } from './configs';
import { IUserProfile } from '@/types/user';

interface IUserState {
    profile: IUserProfile | null;
    token: string | null;
    refreshToken: string | null;
    setUserProfile: (profile: IUserProfile | null) => void;
    updateUserProfile: (profile: any) => void;
    setToken: (token: string | null) => void;
    setRefreshToken: (refreshToken: string | null) => void;
    onLogout: () => void;
    setAllNewToken: (token: string, refreshToken: string) => void;
}

const useUserProfile = create<IUserState>()(
    devtools(
        persist(
            set => ({
                profile: null,
                token: null,
                refreshToken: null,
                setUserProfile: (profile: IUserProfile | null) => set({ profile }),
                updateUserProfile: (profile: any) =>
                    set(state => ({
                        profile: { ...state.profile, ...profile },
                    })),
                setToken: (token: string | null) => set({ token }),
                setRefreshToken: (refreshToken: string | null) => set({ refreshToken }),
                setAllNewToken: (token: string, refreshToken: string) => set({ token, refreshToken }),
                onLogout: async () => {
                    set({ profile: null, token: null, refreshToken: null });
                },
            }),
            {
                name: 'user-profile',
                storage: typeof window !== 'undefined' ? asyncStorage : undefined,
            },
        ),
    ),
);
export default useUserProfile;
