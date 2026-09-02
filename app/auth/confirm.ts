// import { createClient } from "@/src/utils/server";
// import { EmailOtpType } from "@supabase/supabase-js";
// import { NextRequest } from "next/server";


// async function GET(request: NextRequest) {
//     const { searchParams } = new URL(request.url);
//     const token_hash = searchParams.get('token_hash');
//     const type = searchParams.get('type') as EmailOtpType | null;

//     if (token_hash && type) {
//         const supabase = createClient();
//         const { data, error } = await supabase.auth.verifyOtp({type, token_hash})

//         if (!error && data.user){
//             const {first_name, last_name} = data.user.user_metadata

//             await fetch backend API to create user in database with first_name and last_name
//         }

    