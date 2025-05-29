"use server";
import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase"

interface getAllCompanions{
    limit?: number;
    page?: number;
    subject?: string | string[];
    topic?: string | string[];
    language?: string | string[] ;
}

export const getAllCompanions = async ({limit= 10, page= 1 , topic, subject, language} : getAllCompanions) => {
    const supabase = createSupabaseClient()

    let query = supabase.from("companions").select()

    console.log("Companion Filters:",  language );

    if(subject && topic){
        query = query.ilike("subject", `%${subject}%`).or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    } else if(subject){
        query = query.ilike("subject", `%${subject}%`)
    } else if(topic){
        query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    } 

    
  if (language && language !== "All") {
    query = query.ilike("language", `%${language}%`);
  }

    query = query.range((page - 1) * limit, page * limit - 1)

    const { data: companions, error } = await query
    if (error){
        return []
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
        return[]
    }

    return companion || null;

}

export const initUserCallUsage = async () => {
  const supabase = createSupabaseClient();
  const { userId } = await auth();
  if (!userId) throw new Error("User not authenticated");

  // Cek apakah data sudah ada
  const { data: existing, error: fetchError } = await supabase
    .from("user_call_usage")
    .select("user_id")
    .eq("user_id", userId)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    throw new Error("Gagal mengecek user: " + fetchError.message);
  }

  if (existing) {
    console.log("User sudah punya usage data, tidak perlu insert.");
    return existing;
  }

  // Insert hanya kalau belum ada
  const { data, error } = await supabase
    .from("user_call_usage")
    .insert([{ user_id: userId, remaining_seconds: 25 }]);

  if (error) throw new Error("Gagal membuat usage awal: " + error.message);
  return data;
};



export const getUserCallUsage = async (): Promise<number> => {
  const supabase = createSupabaseClient();

  const { userId } = await auth();
  if (!userId) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("user_call_usage")
    .select("remaining_seconds")
    .eq("user_id", userId)
    .single();

  if (error || !data) {
    throw new Error(`Error fetching user call usage: ${error?.message}`);
  }

  return data.remaining_seconds ?? 0;
};


export const updateUserCallUsage = async (seconds: number) => {
    const supabase = createSupabaseClient();

    const { userId } = await auth();
    if (!userId) throw new Error("User not authenticated");

    const { data, error } = await supabase
        .from("user_call_usage")
        .update({ remaining_seconds: seconds })
        .eq("user_id", userId)
        .select()
        .single();

    if (error) {
        throw new Error(`Error updating user call usage: ${error.message}`);
    }

    return data.total_used_seconds || 0;
};