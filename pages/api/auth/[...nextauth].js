import NextAuth from "next-auth";
// import {GithubProvider} from 'next-auth/providers';
import GoogleProvider from 'next-auth/providers/google';
export default NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    // pages: {
    //     signIn: '/auth/signin'
    // }
})
