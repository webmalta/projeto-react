interface Auth {
    isAuthenticated: boolean;
    login: (user: string, password: string) => boolean;
    logout: () => void;
}
  
export const mockAuth: Auth = {
    isAuthenticated: false,
    login(user: string, password: string): boolean {
      if (user === "admin" && password === "12345") {
        this.isAuthenticated = true;
        return true;
      }
      return false;
    },

    logout() {
      this.isAuthenticated = false;
    },
};