export const checkUserAccess = async(prisma: any, userId: any, postId: any) =>{
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })
    if(!user){
        return {
            message: 'user not found',
            post: null
        }
    }
    const postInfo = await prisma.post.findUnique({
        where: {
            id: Number(postId)
        }
    })
    if(!postInfo){
        return {
            message: 'Post not found',
            post: null
        }
    }
    if(user.id !== postInfo.authorId){
        return {
            message: 'This is not your post',
            post: null
        }
    }
}