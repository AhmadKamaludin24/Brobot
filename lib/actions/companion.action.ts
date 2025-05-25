"use server";
import { createSupabaseClient } from "../supabase"

interface getAllCompanions{
    limit?: number;
    page?: number;
    subject?: string | string[];
    topic?: string | string[];
}

export const getAllCompanions = async ({limit= 10, page= 1 , topic, subject} : getAllCompanions) => {
    const supabase = createSupabaseClient()

    let query = supabase.from("companions").select()

    if(subject && topic){
        query = query.ilike("subject", `%${subject}%`).or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    } else if(subject){
        query = query.ilike("subject", `%${subject}%`)
    } else if(topic){
        query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    }

    query = query.range((page - 1) * limit, page * limit - 1)

    const { data: companions, error } = await query
    if (error){
        throw new Error(`Error fetching companions: ${error.message}`);
    }
    return companions || [];
}

export const getCompanionById = async (id: string) => {
    const supabase = createSupabaseClient()

    const { data: companion, error } = await supabase
        .from("companions")
        .select()
        .eq("id", id)
        .single();

    if (error) {
        throw new Error(`Error fetching companion: ${error.message}`);
    }

    return companion || null;
}