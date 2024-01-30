<style scoped>
.messages {
  min-height: calc(100vh - 109.6px);
}
</style>

<template>
  <main>
    <!-- header -->

    <header class="header fixed w-full top-0 left-0 bg-slate-100">
      <div class="container mx-auto p-4 flex justify-center">
        <h1 class="font-medium">Novda <span class="text-blue-700">Ai</span></h1>
      </div>
    </header>

    <!-- Messages -->

    <div class="messages mb-[53.6px] mt-14 w-full overflow-y-scroll">
      <div class="container messages flex flex-col justify-end mx-auto">
        <div class="w-full min-h-10 space-y-2 py-4">
          <div
            class="w-full bg-white flex"
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

    <form class="chat-form bg-slate-100 w-full fixed bottom-0 left-0">
      <div class="mx-auto py-2 container space-x-4 flex px-4 items-center">
        <input
          type="text"
          placeholder="Tell me more about ..."
          class="border h-full text-sm border-slate-300 rounded-md chat-form-input flex-1 p-2"
          aria-label="Type your message"
          v-model="chatStore.prompt"
        />
        <button
          class="bg-slate-900 text-white sm:px-16 px-8 rounded-md text-sm font-semibold py-2"
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
import { computed, onUnmounted } from "vue";
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
  sessionStorage.clear()
}),
</script>
