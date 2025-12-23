import { createGroq } from '@ai-sdk/groq';
import { generateObject, type ModelMessage } from 'ai';
import { viewRouteAgentPrompt } from '@/configs/view-route-prompt';
import { routeSchema, type PageName } from '@/configs/view-route-config';
import { getPageText } from '@/helpers/pageContent';
import { aboutMePrompt, responseSchema } from '@/configs/about-me-prompt';

export interface ChatResponse {
    text: string;
    page: PageName;
}

const groq = createGroq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
});

const model = groq('openai/gpt-oss-120b');

export const chat = async (messages: ModelMessage[]): Promise<ChatResponse> => {
    // Step 1: Route to find the right page
    const routeResponse = await generateObject({
        system: viewRouteAgentPrompt,
        model,
        messages,
        schema: routeSchema,
    });

    const selectedPage = routeResponse.object.selectedPage;

    // Step 2: Get page content
    const pageContent = await getPageText(selectedPage);

    // Step 3: Generate response with page context
    const response = await generateObject({
        system: aboutMePrompt(pageContent),
        model,
        messages,
        schema: responseSchema,
    });

    if (response.object.notSure) {
        return { text: response.object.response, page: "Contact" };
    }

    return { text: response.object.response, page: selectedPage };
};
