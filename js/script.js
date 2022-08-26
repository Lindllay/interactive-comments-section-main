const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnModalCancel = document.querySelector(".btn--form-grey");
const btnModalDelete = document.querySelector(".btn--form-red");
const itemContainer = document.querySelector(".section");
let state;
let ID = 1;
let deleteID;
let itemType;

const timeout = function (item) {
	setTimeout(function () {
		item.nextElementSibling.remove();
		item.remove();
	}, 500);
};

const renderData = function (data) {
	data.comments.forEach((comment) => {
		ID = ID < comment.id ? comment.id : ID;
		let replyMarkup = "";
		comment.replies.forEach((reply) => {
			ID = ID < reply.id ? reply.id : ID;

			replyMarkup += `<div class="comment answer-parent" data-id="${
				reply.id
			}">
            <div class="comment__vote">
              <span class="comment__vote--button">+</span
              ><span class="comment__vote--rating">${reply.score}</span
              ><span class="comment__vote--button">–</span>
            </div>
            <div class="comment__content">
              <div class="comment__content--top">
                <div class="info-container">
                  <div class="photo">
                    <img
                      src="${reply.user.image.png}"
                      alt=""
                    />
                  </div>
        
                  <span class="user">${reply.user.username}</span
                  >${
						reply.user.username === data.currentUser.username
							? `<span class="you">you</span>`
							: ""
					}
                  <span class="time">${reply.createdAt}</span>
                </div>
              </div>
              <div class="comment__content--bottom">
                <span class="reference"></span>
                ${reply.content}
              </div>
              <!-- <form class="answer__form vertical">
                <textarea
                  type="text"
                  placeholder="Add a comment..."
                  class="input"
                ></textarea>
                <button class="btn btn--big btn--reply">Update</button>
              </form> -->
            </div>
            <div class="btn-container">
            ${
				reply.user.username === data.currentUser.username
					? `<div class="btn-icon-box delete-box delete-box--reply">
                  <div class="icon icon--red icon--delete"></div>
                  <a href="#" class="btn btn--small btn--red"
                      >Delete</a
                  >
              </div>
              <div class="btn-icon-box edit-box">
                  <div class="icon icon--blue icon--edit"></div>
                  <a href="#" class="btn btn--small btn--blue"
                      >Edit</a
                  >
              </div>`
					: `<div class="btn-icon-box reply-box">
          <div class="icon icon--blue icon--reply"></div>
          <a href="#" class="btn btn--small btn--blue"
              >Reply</a>
        </div>`
			}
            </div>
          </div>
          <div class="answer display-none">
			<div class="answer__img">
				<img
					src="../images/avatars/image-juliusomo.png"
					alt=""
					class="answer__avatar--img"
				/>
			</div>
			<form class="answer__form">
				<textarea
					type="text"
					placeholder="Add a comment..."
					class="input"
					maxlength="255"
				></textarea>
				<button class="btn btn--big btn--reply">
					Reply
				</button>
			</form>
		</div>`;
		});
		const commentMarkup = `<div class="item" data-id="${comment.id}">
        <div class="comment answer-parent">
            <div class="comment__vote">
                <span class="comment__vote--button">+</span
                ><span class="comment__vote--rating">${comment.score}</span
                ><span class="comment__vote--button">–</span>
            </div>
            <div class="comment__content">
                <div class="comment__content--top">
                    <div class="info-container">
                        <div class="photo">
                            <img
                                src=".${comment.user.image.png}"
                                alt=""
                            />
                        </div>
                        <span class="user">${comment.user.username}</span>
                        <span class="time">${comment.createdAt}</span>
                    </div>
                </div>
                <div class="comment__content--bottom">
                    ${comment.content}
                </div>
            </div>
            <div class="btn-container">
            ${
				comment.user.username === data.currentUser.username
					? `<div class="btn-icon-box delete-box delete-box--comment">
                  <div class="icon icon--red icon--delete"></div>
                  <a href="#" class="btn btn--small btn--red"
                      >Delete</a
                  >
              </div>
              <div class="btn-icon-box edit-box">
                  <div class="icon icon--blue icon--edit"></div>
                  <a href="#" class="btn btn--small btn--blue"
                      >Edit</a
                  >
              </div>`
					: `<div class="btn-icon-box reply-box">
                        <div class="icon icon--blue icon--reply"></div>
                            <a href="#" class="btn btn--small btn--blue">Reply</a>
                        </div>`
			}
			        </div>
                 </div>
             <!-- Reply form -->
        <div class="answer display-none">
            <div class="answer__img">
                <img
                    src=".${data.currentUser.image.png}"
                    alt=""
                    class="answer__avatar--img"
                />
            </div>
                <form class="answer__form">
                    <textarea
                      type="text"
                      placeholder="Add a comment..."
                     class="input"></textarea>
                <button class="btn btn--big btn--reply">Reply</button>
                 </form>
             </div>
            </div>
        <div class="replies">
        <div class="replies__border"></div>
    <div class="replies__container">
    ${replyMarkup}</div>
            </div>`;

		itemContainer.insertAdjacentHTML("beforeend", commentMarkup);
	});
	const bottomTextarea = `<div class="answer">
    <div class="answer__img">
        <img
            src="../images/avatars/image-juliusomo.png"
            alt=""
            class="answer__avatar--img"
        />
    </div>
    <form class="answer__form">
        <textarea
            type="text"
            placeholder="Add a comment..."
            class="input"
            maxlength="255"
        ></textarea>
        <button
            class="btn btn--big btn--send"
            type="submit"
            value="check"
        >
            Send
        </button>
    </form>
        </div>`;
	itemContainer.insertAdjacentHTML("beforeend", bottomTextarea);
};

const newComment = function (curUser, text) {
	ID++;
	const commentData = {
		id: ID,
		content: text,
		createdAt: "now",
		replies: [],
		score: 0,
		user: {
			image: curUser.image.png,
			username: curUser.username,
		},
	};

	state.comments.push(commentData);
};

const ReplyOnComment = function (data, text, elementID) {
	ID++;
	const target = data.comments.find((comment) => comment.id == elementID);

	const replyData = {
		id: ID,
		content: text,
		createdAt: "now",
		replyingTo: "",
		score: 0,
		user: {
			image: data.currentUser.image.png,
			username: data.currentUser.username,
		},
	};
	target.replies.push(replyData);
};

const ReplyOnReply = function (data, text, elementID) {
	ID++;
	let target;
	data.comments.forEach((comment) => {
		comment.replies.forEach((reply) => {
			if (reply.id == elementID) {
				target = comment;
			}
		});
	});
	console.log(target);

	const replyData = {
		id: ID,
		content: text,
		createdAt: "now",
		replyingTo: "",
		score: 0,
		user: {
			image: data.currentUser.image.png,
			username: data.currentUser.username,
		},
	};
	target.replies.push(replyData);
};

//// Data from JSON file

const getJSONData = async function () {
	try {
		const res = await fetch("data.json");
		state = await res.json();
		console.log(state);

		renderData(state);
	} catch (err) {
		console.log(err);
	}
};

getJSONData();

//// Auto-resizing textarea
const inputFocus = function (input) {
	const end = input.value.length;
	input.setSelectionRange(end, end);
	input.focus();
	input.style.height = "auto";
	input.style.height = input.scrollHeight + "px";
};

itemContainer.addEventListener("input", function (e) {
	inputFocus(e.target);
});

//////////////// HANDLE CLICK EVENTS //////////////
document.addEventListener("click", function (e) {
	e.preventDefault();

	const btnSend = e.target.classList.contains("btn--send");
	const btnReply = e.target.classList.contains("btn--reply");

	// /////////// ADD NEW COMMENT OR REPLY //////////
	if (btnReply || btnSend) {
		const text = e.target.previousElementSibling.value;
		const form = e.target.closest(".answer");
		// const commentID =

		const newItemMarkup = `<div class="item" data-id="${ID + 1}">
        <div class="comment answer-parent">
            <div class="comment__vote">
                <span class="comment__vote--button">+</span
                ><span class="comment__vote--rating">0</span
                ><span class="comment__vote--button">–</span>
            </div>
            <div class="comment__content">
                <div class="comment__content--top">
                    <div class="info-container">
                        <div class="photo">
                            <img
                                src="../images/avatars/image-juliusomo.png"
                                alt=""
                            />
                        </div>
                        <span class="user">juliusomo</span>
                        <span class="time">now</span>
                    </div>
                </div>
                <div class="comment__content--bottom">
                    ${text}
                </div>
            </div>
            <div class="btn-container">
				<div class="btn-icon-box delete-box delete-box--comment">
					<div
						class="icon icon--red icon--delete"
					></div>
					<a href="#" class="btn btn--small btn--red"
						>Delete</a
					>
				</div>
				<div class="btn-icon-box edit-box">
					<div
						class="icon icon--blue icon--edit"
					></div>
					<a href="#" class="btn btn--small btn--blue"
						>Edit</a
					>
				</div>
			</div>
        </div>
        <!-- Reply form -->
<div class="answer display-none">
            <div class="answer__img">
                <img
                    src="../images/avatars/image-juliusomo.png"
                    alt=""
                    class="answer__avatar--img"
                />
            </div>
            <form class="answer__form">
                <textarea
                    type="text"
                    placeholder="Add a comment..."
                    class="input"
                ></textarea>
                <button class="btn btn--big btn--reply">Reply</button>
            </form>
        </div>
    </div>
<div class="replies">
<div class="replies__border"></div>
<div class="replies__container"></div>
            </div>`;
		const newReplyMarkup = `<div class="comment answer-parent" data-id="${
			ID + 1
		}">
        <div class="comment__vote">
          <span class="comment__vote--button">+</span
          ><span class="comment__vote--rating">2</span
          ><span class="comment__vote--button">–</span>
        </div>
        <div class="comment__content">
          <div class="comment__content--top">
            <div class="info-container">
              <div class="photo">
                <img
                  src="../images/avatars/image-juliusomo.png"
                  alt=""
                />
              </div>

              <span class="user">juliusomo</span
              ><span class="you">you</span>
              <span class="time">2 days ago</span>
            </div>
          </div>
          <div class="comment__content--bottom">
            <span class="reference"></span>
            ${text}
            
           
          </div>
          <!-- <form class="answer__form vertical">
            <textarea
              type="text"
              placeholder="Add a comment..."
              class="input"
            ></textarea>
            <button class="btn btn--big btn--reply">Update</button>
          </form> -->
        </div>
        <div class="btn-container">
          <div class="btn-icon-box delete-box delete-box--reply">
            <div
              class="icon icon--red icon--delete"
            ></div>
            <a href="#" class="btn btn--small btn--red"
              >Delete</a
            >
          </div>
          <div class="btn-icon-box edit-box">
            <div
              class="icon icon--blue icon--edit"
            ></div>
            <a href="#" class="btn btn--small btn--blue"
              >Edit</a
            >
          </div>
        </div>
            </div>`;

		const formMarkup = `<div class="answer ${
			btnReply ? "display-none" : ""
		}">
    <div class="answer__img">
        <img
            src="../images/avatars/image-juliusomo.png"
            alt=""
            class="answer__avatar--img"
        />
    </div>
    <form class="answer__form">
        <textarea
            type="text"
            placeholder="Add a comment..."
            class="input"
            ></textarea>
            <button class="btn btn--big btn--send">Send</button>
            </form>
            </div>`;

		// NEW COMMENT
		if (btnSend) {
			itemContainer.insertAdjacentHTML("beforeend", newItemMarkup);
			form.remove();
			itemContainer.insertAdjacentHTML("beforeend", formMarkup);

			newComment(state.currentUser, text);
			console.log(state);
		}

		// REPLY ON COMMENT
		if (e.target.closest(".item")) {
			const repliesContainer = e.target
				.closest(".item")
				.nextElementSibling.querySelector(".replies__container");

			repliesContainer.insertAdjacentHTML("beforeend", newReplyMarkup);
			form.classList.toggle("display-none");
			form.querySelector(".input").value = "";
			repliesContainer.insertAdjacentHTML("beforeend", formMarkup);

			const targetID = e.target.closest(".item").dataset.id;

			ReplyOnComment(state, text, targetID);

			e.target.closest(".item").querySelector(".input").style.height =
				"8rem";
		}
		// REPLY ON REPLY
		if (e.target.closest(".replies__container")) {
			const repliesContainer = e.target.closest(".replies__container");

			repliesContainer.insertAdjacentHTML("beforeend", newReplyMarkup);
			form.classList.toggle("display-none");
			form.querySelector(".input").value = "";
			repliesContainer.insertAdjacentHTML("beforeend", formMarkup);

			const targetID =
				e.target.closest(".answer").previousElementSibling.dataset.id;

			ReplyOnReply(state, text, targetID);
		}
	}

	///////// DELETE COMMENTS ////////

	// DELETE COMMENT
	if (e.target.closest(".delete-box--comment")) {
		const comment = e.target.closest(".item");
		const commentID = comment.dataset.id;
		deleteID = commentID;
		itemType = "comment";
	}
	// DELETE REPLY
	if (e.target.closest(".delete-box--reply")) {
		const reply = e.target.closest(".answer-parent");
		const targetID = reply.dataset.id;
		deleteID = targetID;
		itemType = "reply";
	}

	if (e.target == btnModalDelete) {
		overlay.classList.add("hidden");
		modal.classList.add("hidden");

		if (itemType === "comment") {
			timeout(document.querySelector(`.item[data-id="${deleteID}"]`));
			const target = state.comments.find(
				(comment) => comment.id == deleteID
			);

			console.log(deleteID);
		}
		if (itemType === "reply") {
			timeout(
				document.querySelector(`.answer-parent[data-id="${deleteID}"]`)
			);
			console.log(deleteID);
		}
	}

	//////////////// MODAL ////////////////
	if (e.target.parentElement.classList.contains("delete-box")) {
		modal.classList.remove("hidden");
		overlay.classList.remove("hidden");
	}
	if (e.target === overlay || e.target === btnModalCancel) {
		overlay.classList.add("hidden");
		modal.classList.add("hidden");
	}

	//////////////// EDIT CONTENT /////////////

	if (e.target.parentElement.classList.contains("edit-box")) {
		const textbox = e.target
			.closest(".answer-parent")
			.querySelector(".comment__content--bottom");

		if (textbox) {
			const text = textbox.textContent
				.replaceAll("\t", "")
				.replaceAll("\n", " ")
				.trim();

			const formMarkup = `<form class="answer__form vertical">
	    		    <textarea
	    		        type="text"
	    		        placeholder="Add a comment..."
	    		        class="input"
	    		    >${text}</textarea>
	    		    <button class="btn btn--big btn--update">Update</button>
	    		</form>`;

			//// Switch between old comment and answer form, filled with text
			textbox.insertAdjacentHTML("afterend", formMarkup);
			textbox.remove();

			inputFocus(
				e.target.closest(".answer-parent").querySelector(".input")
			);
		}
	}
	if (e.target.classList.contains("btn--update")) {
		const input = e.target
			.closest(".answer-parent")
			.querySelector(".input");
		const inputValue = input.value;
		const btn = e.target;

		const textboxMarkup = `<div class="comment__content--bottom">
        <span class="reference"></span>
        ${inputValue}
    </div>`;

		input.insertAdjacentHTML("afterend", textboxMarkup);

		input.remove();
		btn.remove();
	}

	if (e.target.parentElement?.classList.contains("reply-box")) {
		e.target
			.closest(".answer-parent")
			.nextElementSibling.classList.toggle("display-none");
	}

	////// ADD POINTS to COMMENT or REPLY
	if (e.target.classList.contains("comment__vote--button")) {
		const btnPlus = e.target.parentElement.firstElementChild;
		const btnMinus = e.target.parentElement.lastElementChild;

		let rating = e.target.parentElement.querySelector(
			".comment__vote--rating"
		);
		const btn = e.target.textContent;
		// console.log(rating);

		if (e.target === btnPlus) {
			rating.textContent++;
		}
		if (e.target === btnMinus) {
			rating.textContent--;
		}
	}
});
