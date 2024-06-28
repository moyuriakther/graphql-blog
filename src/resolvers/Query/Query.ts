export const Query = {
  myProfile: async (parent:any, args:any, {prisma, userInfo}:any) =>{
        return await prisma.user.findFirst({
          where:{
            id: userInfo.userId
          }
        })
     },
     profile: async (parent:any, args:any, {prisma, userInfo}:any) =>{
        return await prisma.profile.findUnique({
        where:{
          userId: Number(args.userId)
        }
      })
   },
    users: async (parent:any, args:any, {prisma}:any) =>{
        return await prisma.user.findMany()
     },
     posts: async (parent:any, args:any, {prisma}:any) =>{
      return await prisma.post.findMany({
        where:{
          published: true
        },orderBy: {
          createdAt: 'desc'
        }
      })
    },
   }