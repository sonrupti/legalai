import { Chat } from "@/types/chat";

const CHAT_KEY = "legal-ai-chats";
const CURRENT_KEY = "legal-ai-current-chat";


// Get all chats
export function getChats(): Chat[] {

    if (typeof window === "undefined") {
        return [];
    }


    const data =
        localStorage.getItem(CHAT_KEY);



    if (!data) {
        return [];
    }



    try {

        const parsed = JSON.parse(data);


        if (Array.isArray(parsed)) {
            return parsed;
        }


        return [];


    } catch {

        return [];

    }

}







// Save all chats
export function saveChats(
    chats: Chat[]
) {

    if (typeof window === "undefined") {
        return;
    }


    localStorage.setItem(
        CHAT_KEY,
        JSON.stringify(chats)
    );

}







// Get selected chat ID
export function getCurrentChatId() {


    if (typeof window === "undefined") {
        return null;
    }


    return localStorage.getItem(
        CURRENT_KEY
    );

}







// Save selected chat ID
export function saveCurrentChatId(
    id: string
) {


    if (typeof window === "undefined") {
        return;
    }


    localStorage.setItem(
        CURRENT_KEY,
        id
    );

}







// Optional: clear everything
export function clearChatStorage() {

    if (typeof window === "undefined") {
        return;
    }


    localStorage.removeItem(CHAT_KEY);

    localStorage.removeItem(CURRENT_KEY);

}