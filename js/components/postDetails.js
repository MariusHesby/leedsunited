const postDetails = (postTitle, postImg, postContent, postDate) => {
  return `  
                        
                        <div class="content">
                            <h2>${postTitle}</h2>
                            <div class="postImgContainer">
                            <img src="${postImg}" alt="${postTitle}" class="postImgDetails">
                            </div>
                            ${postContent}
                            
                            <p class="posted">Posted: ${postDate}</p>
                            
                            <div class="modal">
                            <img src="${postImg}" alt="${postTitle}" class="big-img" />
                            </div>
                        </div>
          `;
};
