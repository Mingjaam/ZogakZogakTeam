// 사람 인식 관련 AI 기능

import { Person } from "./ai-types";
import { createGeminiClient, fileToGenerativePart, validateApiResponse, handleApiError } from "./gemini-api-client";

/**
 * 사람을 식별하는 함수
 * @param targetImageBase64 - 식별할 이미지의 base64 문자열
 * @param knownPeople - 알고 있는 사람들의 목록
 * @returns 식별된 사람의 이름 또는 "모르는 사람" 또는 "사람 없음"
 */
export const identifyPerson = async (
    targetImageBase64: string,
    knownPeople: Person[]
): Promise<string> => {
    const ai = createGeminiClient();
    
    if (!ai) {
        return "API 키가 설정되지 않았습니다.";
    }

    try {
        const parts: any[] = [
            { 
                text: "당신은 노인들이 사람을 알아보는 것을 돕는 조수입니다. 제가 아는 사람들의 목록과 사진을 제공하겠습니다. 그리고 새로운 사진을 보여드릴 것입니다. 새로운 사진 속의 사람이 제가 아는 사람 목록에 있는지 알려주세요. 만약 목록에 있다면, 그 사람의 이름을 말해주세요. 목록에 없다면 '모르는 사람'이라고 말해주세요. 사진에 사람이 없다면 '사람 없음'이라고 말해주세요. 한 사람만 식별하고, 사람의 이름, '모르는 사람', 또는 '사람 없음'으로만 대답해주세요.\n\n제가 아는 사람들:\n" 
            }
        ];

        if (knownPeople.length === 0) {
            parts.push({ text: "아직 아는 사람이 없습니다.\n" });
        } else {
            for (const person of knownPeople) {
                parts.push(fileToGenerativePart(person.photo, "image/jpeg"));
                parts.push({ text: `이 사람은 ${person.name}, 저의 ${person.relationship}입니다.\n` });
            }
        }
        
        parts.push({ text: "\n자, 이 새로운 사진 속 인물은 누구인가요?\n" });
        parts.push(fileToGenerativePart(targetImageBase64, "image/jpeg"));

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts },
        });

        if (!validateApiResponse(response)) {
            return "AI로부터 유효한 답변을 받지 못했습니다.";
        }

        return response.text.trim();
    } catch (error) {
        return handleApiError(error, "사람을 인식하는 동안");
    }
};

/**
 * 이미지에 얼굴이 있는지 감지하는 함수
 * @param targetImageBase64 - 감지할 이미지의 base64 문자열
 * @returns 얼굴이 있으면 true, 없으면 false
 */
export const detectFace = async (targetImageBase64: string): Promise<boolean> => {
    const ai = createGeminiClient();
    
    if (!ai) {
        console.error("API 키가 설정되지 않았습니다.");
        return false;
    }

    try {
        const parts = [
            { text: "Does this image contain a human face? Answer with only 'Yes' or 'No'." },
            fileToGenerativePart(targetImageBase64, "image/jpeg"),
        ];

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts },
        });
        
        if (!validateApiResponse(response)) {
            return false;
        }

        return response.text.trim().toLowerCase() === 'yes';
    } catch (error) {
        console.error("Error detecting face:", error);
        return false;
    }
};
