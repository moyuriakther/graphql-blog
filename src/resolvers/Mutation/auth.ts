import bcrypt from "bcrypt";
import { jwtHelper } from "../../utils/jwtHelper";
import config from "../../config";


interface ISignUp{
    name: string,
    email: string,
    password: string,
    bio?: string
}
export const authResolver = {
    signup: async(parent: any, args:ISignUp,{prisma}: any ) =>{
        const isUserExist = await prisma.user.findFirst({
            where: {email: args.email}
        })
        if(isUserExist){
            return {
                message: "User Already Exist",
                token: null
            }
        }
        const hashedPassword = await bcrypt.hash(args.password, 12)
            const userInfo = await prisma.user.create({data:{name: args.name, email: args.email, password: hashedPassword}});
            if(args.bio){
                const profileInfo = await prisma.profile.create({data: {
                    bio: args.bio,
                    userId: userInfo.id
                }})
            }
            const token = await jwtHelper(userInfo.id, config.jwt.secret as string)
            return {
                message: "User Created Successfully",
                token
            }
    },
    signin: async(parent: any, args: any, {prisma}: any) =>{
        const isUserExist = await prisma.user.findFirst({where: {email: args.email}})
        if(!isUserExist){
            return {
                message: "User Not Found",
                token : null
            }
        }
        const isPasswordCorrect = await bcrypt.compare(args.password, isUserExist.password)
        if(!isPasswordCorrect){
            return {
                message: "Password Incorrect",
                token : null
            }
        }           
            const token =await jwtHelper(isUserExist.id, config.jwt.secret as string)
            return {
                message: "User Login Successfully",
                token
            }
    },
}