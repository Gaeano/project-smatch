'use client'
import { createClient } from '@/src/utils/client'

export async function SignupEmail(email: string, password: string, firstName: string, lastName: string){
    const supabase = createClient();
    const {data, error} = await supabase.auth.signUp({
        email: email,
        password: password,
        options:{
            data:{
                first_name: firstName,
                last_name: lastName
            },
        },
    });
    return {data, error};
}

