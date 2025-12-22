import { createGroq } from '@ai-sdk/groq';
import { generateObject } from 'ai';
import { aboutMePrompt, aboutMeSchema } from '@/configs/aboutMePrompt';

export type RedirectType = 'volvo' | 'ai-tooling' | 'about' | 'contact' | 'null';

export interface ChatResponse {
    content: string;
    redirect: RedirectType;
}

const groq = createGroq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
});

const model = groq('openai/gpt-oss-20b');

export const chat = async (messages: any): Promise<ChatResponse> => {
    const response = await generateObject({
        system: aboutMePrompt,
        model,
        messages,
        schema: aboutMeSchema,
    });
    return response.object as ChatResponse;
};
