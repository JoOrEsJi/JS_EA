console.log("Inicio");

function getUser(userId) {
    return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        });
}

function getPosts(userId) {
    return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        });
}

function getComments(postId) {
    return fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        }); 
}

async function fetchUserDetails() {
    try {
        const user = await getUser(3);
        const posts = await getPosts(user.id);

        const commentsArray = await Promise.all(posts.map(post => getComments(post.id)));

        const postsWithComments = posts.map((post, index) => ({
            ...post,
            commentsCount: commentsArray[index].length,
            comments: commentsArray[index]
        }));

        const filteredPosts = postsWithComments.filter(post => post.commentsCount >= 5);
        
        const totalComments = postsWithComments.reduce((acc, post) => acc + post.commentsCount, 0);

        console.log("Usuario:", user);
        console.log("Posts con comentarios:", postsWithComments);
        console.log("Posts con 5 o más comentarios:", filteredPosts);
        console.log("Total de comentarios:", totalComments);

    } catch (error) {
        console.error(error);
    }
} 
fetchUserDetails();