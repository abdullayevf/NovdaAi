import { defineStore } from "pinia";
import axios from "axios";

export const useChatStore = defineStore("chat", {
  state: () => ({
    prompt: "",
    messages: JSON.parse(sessionStorage.getItem("messages")),
    serverId: sessionStorage.getItem("server-given-id"),
    loading: false,
    error: false,
  }),
  actions: {
    async sendMessage(prompt) {
      if (prompt.length > 0) {
        this.loading = true;
        this.prompt = "";
        try {
          const data = await axios.post(
            "https://novda-ai-server-novda-union.onrender.com/chat/beta/",
            { message: prompt },
            {
              headers: {
                "server-given-id": this.serverId,
              },
            }
          );

          if (this.serverId == null) {
            sessionStorage.setItem("server-given-id", data.data.userId);
            this.serverId = data.data.userId;
          }

          this.messages = Object.values(data.data.chatHistory)[0].slice(1);
          sessionStorage.setItem(
            "messages",
            JSON.stringify(Object.values(data.data.chatHistory)[0].slice(1))
          );

          console.log(data.data.chatHistory);
        } catch (error) {
          alert(error);
          console.log(error);
        }
        this.loading = false;
      }
    },
  },
});
