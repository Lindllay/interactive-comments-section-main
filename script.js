const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnModalCancel = document.querySelector(".btn--form-grey");
const btnModalDelete = document.querySelector(".btn--form-red");
const btnCommentReply = document.querySelectorAll(".reply-box");
const btnCommentDelete = document.querySelectorAll(".delete-box");

//////////////// MODAL ////////////////

btnCommentDelete.forEach((btn) =>
	btn.addEventListener("click", function () {
		modal.classList.remove("hidden");
		overlay.classList.remove("hidden");
	})
);

overlay.addEventListener("click", function () {
	overlay.classList.add("hidden");
	modal.classList.add("hidden");
});

btnModalCancel.addEventListener("click", function () {
	modal.classList.add("hidden");
	overlay.classList.add("hidden");
});

//////////// REPLY SHOW/HIDE FORM //////////////

btnCommentReply.forEach((btn) =>
	btn.addEventListener("click", function (e) {
		e.preventDefault();

		e.currentTarget
			.closest(".answer-parent")
			.nextElementSibling.classList.toggle("display-none");
	})
);

//////// EDIT COMMENT /////////
