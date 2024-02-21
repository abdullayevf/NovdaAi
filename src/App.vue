<style scoped>
.messages {
  min-height: calc(100vh - 109.6px);
}
</style>

<template>
  <main>
    <!-- header -->

    <header class="fixed top-0 left-0 w-full header bg-slate-100">
      <div class="container flex justify-center p-4 mx-auto">
        <h1 class="font-medium">Novda <span class="text-blue-700">Ai</span></h1>
      </div>
    </header>

    <!-- Messages -->

    <div class="messages mb-[53.6px] mt-14 w-full overflow-y-scroll">
      <div class="container flex flex-col justify-end mx-auto messages">
        <div class="w-full py-4 space-y-2 min-h-10">
          <div
            class="flex w-full bg-white"
            v-for="(message, index) in chatStore.messages"
            :key="index"
            :class="{ 'justify-end': message.role === 'user' }"
          >
            <p
              class="max-w-[80%] text-justify inline-block px-4 rounded-md py-1"
              :class="{
                ...messageStyles(message),
                'bg-blue-50': message.role === 'assistant',
              }"
            >
              {{ message.content }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat form -->

    <form class="fixed bottom-0 left-0 w-full chat-form bg-slate-100">
      <div class="container flex items-center px-4 py-2 mx-auto space-x-4">
        <input
          type="text"
          placeholder="e.g. Do cats really have 9 lives?"
          class="flex-1 h-full p-2 text-sm border rounded-md border-slate-300 chat-form-input"
          aria-label="Type your message"
          v-model="chatStore.prompt"
        />
        <button
          class="px-8 py-2 text-sm font-semibold text-white rounded-md bg-slate-900 sm:px-16"
          aria-label="Send the message"
          @click.prevent="chatStore.sendMessage(chatStore.prompt)"
          :disabled="chatStore.loading"
        >
          Send
        </button>
      </div>
    </form>
  </main>
</template>

<script setup>
import { computed, onBeforeUnmount, onUnmounted } from "vue";
import { useChatStore } from "./stores/chatStore";

const chatStore = useChatStore();

const messageStyles = computed(() => {
  return (message) => {
    return {
      "from-slate-800": message.role === "user",
      "to-slate-700": message.role === "user",
      "bg-gradient-to-tr": message.role === "user",
      "text-white": message.role === "user",
    };
  };
});

onUnmounted(() => {
  chatStore.clearUp();
});
</script>
