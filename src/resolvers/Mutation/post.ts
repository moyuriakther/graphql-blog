import { checkUserAccess } from "../../utils/checkUserAccess"

export const postResolver = {
    createPost: async(parent:any, {post}: any, {prisma, userInfo}: any) =>{
        if(!userInfo){
            return {
                message: 'You are Unauthorized',
                post: null
            }
        }
        if(!post.title || !post.content){
            return {
                message: 'title and content is required',
                post: null
            }
        }
        const newPost = await prisma.post.create({
            data: {
                title: post.title,
                content: post.content,
                authorId: userInfo.userId
            }
        })
        return {
            message: 'Post Created Successfully',
            post: newPost
        }

    },
    updatePost: async(parent:any, {postId, post}: any, {prisma, userInfo}: any) =>{
        // console.log(post.title, {postId}, userInfo)
        if(!userInfo){
            return {
                message: 'You are Unauthorized',
                post: null
            }
        }

       const error = await checkUserAccess(prisma, userInfo.userId, postId)
       if(error){
        return error;
       }

        const updatedPost = await prisma.post.update({
            where: {
                id: Number(postId)
            },
            data: {               
                title: post.title,
                content: post.content
            }
        })
        return {
            message: "Post updated Successfully",
            post: updatedPost
        }
    },
    deletePost: async(parent:any, {postId}: any, {prisma, userInfo}: any) =>{
        // console.log(post.title, {postId}, userInfo)
        if(!userInfo){
            return {
                message: 'You are Unauthorized',
                post: null
            }
        }

       const error = await checkUserAccess(prisma, userInfo.userId, postId)
       if(error){
        return error;
       }
       
        const deletePost = await prisma.post.delete({
            where: {
                id: Number(postId)
            },
        })
        return {
            message: "Post Deleted Successfully",
            post: deletePost
        }
    },
    publishPost: async(parent:any, {postId, post}: any, {prisma, userInfo}: any) =>{
        // console.log(post.title, {postId}, userInfo)
        if(!userInfo){
            return {
                message: 'You are Unauthorized',
                post: null
            }
        }

       const error = await checkUserAccess(prisma, userInfo.userId, postId)
       if(error){
        return error;
       }

        const updatedPost = await prisma.post.update({
            where: {
                id: Number(postId)
            },
            data: {               
                published: true
            }
        })
        return {
            message: "Post Published Successfully",
            post: updatedPost
        }
    },
}