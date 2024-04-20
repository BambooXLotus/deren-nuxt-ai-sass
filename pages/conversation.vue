<template>
  <div>
    <Heading
      title="Conversation"
      description="Conversation model"
      icon="lucide:message-square"
      icon-color="text-violet-500"
      bg-color="bg-violet-500/10"
    />
  </div>
  <div class="px-4 lg:px-8">
    <div>
      <form
        @submit.prevent="submitPrompt"
        class="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
      >
        <div class="col-span-12 lg:col-span-10 flex flex-col justify-center">
          <div>
            <div class="m-0 p-0">
              <Input
                v-model="prompt"
                placeholder="Enter something here you wanna talk to the AI lords about..."
                class="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent w-full"
              />
            </div>
          </div>
        </div>
        <Button
          class="col-span-12 lg:col-span-2"
          type="submit"
          :disabled="!prompt || isLoading"
          >Generate
        </Button>
      </form>
    </div>
    <div class="space-y-4 pt-4">
      <div
        v-if="isLoading"
        class="p-8 rounded-lg w-full flex items-center justify-center bg-muted"
      >
        <Loader />
      </div>

      <Empty
        v-if="messages.length === 0 && !isLoading"
        label="DerenAI is ready when you are"
      />

      <div class="flex flex-col-reverse gap-y-4">
        <div
          v-for="message in messages"
          :key="message.content"
          :class="`p-8 w-full flex
               items-start gap-x-8 rounded-lg ${
                 message.role === 'user'
                   ? 'bg-white border border-black/10'
                   : 'bg-slate-200'
               }`"
        >
          <UserAvatar v-if="message.role === 'user'" />
          <BotAvatar v-if="message.role === 'assistant'" />

          <p class="text-sm">{{ message.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type ChatMessage } from '~/types'

const prompt = ref('')
const isLoading = ref(false)
const messages = ref<ChatMessage[]>([])

const submitPrompt = async () => {
  isLoading.value = true

  const userMessage: ChatMessage = {
    role: 'user',
    content: prompt.value,
  }

  const newMessages = [...messages.value, userMessage]

  const { data, error } = await useFetch('/api/conversation', {
    method: 'POST',
    body: {
      messages: newMessages,
    },
  })

  if (data.value) {
    messages.value = [
      ...messages.value,
      userMessage,
      {
        role: 'assistant',
        content: data.value.choices[0].message.content as string,
      },
    ]
  }

  if (error.value) {
    console.log('ERROR', error.value.statusMessage)
  }

  prompt.value = ''
  isLoading.value = false
}
</script>

<style scoped></style>
