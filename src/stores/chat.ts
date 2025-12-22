import { ref } from 'vue';
import { defineStore } from 'pinia';
import { chat, type RedirectType } from '@/helpers/chat';

export interface Message {
    id: number;
    role: 'user' | 'assistant';
    content: string;
    redirect?: RedirectType;
}

export const useChatStore = defineStore('chat', () => {
    const messages = ref<Message[]>([
        {
            id: 1,
            role: 'assistant',
            content: "Hey! I'm Mason's AI assistant. Ask me anything about his work, skills, or projects!",
        },
    ]);

    const isLoading = ref(false);
    const error = ref<string | null>(null);

    const addUserMessage = (content: string) => {
        messages.value.push({
            id: Date.now(),
            role: 'user',
            content,
        });
    };

    const addAssistantMessage = (content: string, redirect?: RedirectType) => {
        messages.value.push({
            id: Date.now() + 1,
            role: 'assistant',
            content,
            redirect: redirect && redirect !== 'null' ? redirect : undefined,
        });
    };

    const sendMessage = async (userMessage: string) => {
        if (!userMessage.trim()) return;

        addUserMessage(userMessage);
        isLoading.value = true;
        error.value = null;

        try {
            // Format messages for the AI SDK (excluding the initial greeting for context)
            const chatMessages = messages.value.map((msg) => ({
                role: msg.role,
                content: msg.content,
            }));

            const response = await chat(chatMessages);
            addAssistantMessage(response.content, response.redirect);
        } catch (e) {
            error.value = e instanceof Error ? e.message : 'Failed to get response';
            addAssistantMessage("Sorry, I couldn't process that request. Please try again.");
        } finally {
            isLoading.value = false;
        }
    };

    const clearMessages = () => {
        messages.value = [
            {
                id: Date.now(),
                role: 'assistant',
                content: "Hey! I'm Mason's AI assistant. Ask me anything about his work, skills, or projects!",
            },
        ];
        error.value = null;
    };

    return {
        messages,
        isLoading,
        error,
        sendMessage,
        clearMessages,
    };
});
