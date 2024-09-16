import { defineStore } from 'pinia';
import { store } from '@/store';
import { TOKEN_KEY, USER_ID_KEY, USER_ROLE_ID_KEY } from '@/enums/cacheEnum';
import { loginApi } from '@/service/sys/user';
import { getToken } from '@/utils/auth';
import { Persistent } from '@/utils/cache/persistent';
import { LoginParams } from '@/service/sys/model/userModel';

interface UserState {
  token?: string;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // token
    token: undefined,
  }),
  getters: {
    getToken(state): string {
      return state.token || getToken();
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info ? info : ''; // for null or undefined value
      Persistent.setLocal(TOKEN_KEY, info)
    },
    resetState() {
      this.token = '';
    },
    /**
     * @description: login
     */
    async login(
      params: LoginParams & {
        goHome?: boolean;
      },
    ): Promise<any> {
      try {
        const { goHome = true, ...loginParams } = params;
        const data = await loginApi(loginParams);
        const { token, user_id } = data;

        // save token
        this.setToken(token);
        Persistent.setLocal(USER_ID_KEY, user_id)

      } catch (error) {
        return Promise.reject(error);
      }
    },

  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
