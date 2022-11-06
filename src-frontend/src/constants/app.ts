export interface AppConstant {
  userName: string;
  socketRequestUrl: string;
  apiUrl: string;
}

export const appConstant: AppConstant = {
  userName: "Arnold Wang",
  socketRequestUrl: "ws://localhost:8080/api/updates",
  apiUrl: "http://localhost:8080/api/",
};
