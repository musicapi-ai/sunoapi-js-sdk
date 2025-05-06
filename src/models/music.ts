export class Music {
    title?: string;
    tags?: string;
    makeInstrumental?: boolean;
    mv: string;
    gptDescriptionPrompt?: string;
    taskType?: string;
    personaId?: string;

    constructor(data: {
        title?: string;
        tags?: string;
        makeInstrumental?: boolean;
        mv: string;
        gptDescriptionPrompt?: string;
        taskType?: string;
        personaId?: string;
    }) {
        this.title = data.title;
        this.tags = data.tags;
        this.makeInstrumental = data.makeInstrumental;
        this.mv = data.mv;
        this.gptDescriptionPrompt = data.gptDescriptionPrompt;
        this.taskType = data.taskType;
        this.personaId = data.personaId;
    }

    toJSON() {
        return {
            title: this.title,
            tags: this.tags,
            make_instrumental: this.makeInstrumental,
            mv: this.mv,
            gpt_description_prompt: this.gptDescriptionPrompt,
            task_type: this.taskType,
            persona_id: this.personaId,
        };
    }
}