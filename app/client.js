window.onload = (event) => {
	var buttons = document.getElementsByClassName("btn");

	for (var i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('click', (e) => {
			let divik = e.target.closest(".new-comment");
			let contents = divik.querySelector('.new-comment > .new-comment-text-area-like-reply > .new-comment-text-area > .new-comment-text > .commentText');
			let commentsId = contents.dataset.id;
			let postId = contents.dataset.postid;
			let newComment = divik.querySelector('.new-comment-text-area');
			let newCommentText = divik.querySelector('.new-comment-text')
			newCommentText.innerHTML = `
											<form class="edit-form" action="/admin/editComment/${postId}/${commentsId}" method="POST">
												<input type="text"  name="inputValue" id="imageUrl" value="${contents.innerText}">
												<button class="btn" type="submit"><i class="fa fa-paper-plane"
													aria-hidden="true"></i></button>
											</form>
`;
			newComment.appendChild(newCommentText);
			console.log(divik);
		}, false);
	}
};
