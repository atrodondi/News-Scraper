$(document).ready(function () {
  // scrape button push - starts the scrape
  $(document).on("click", ".scrape-new", function () {
    console.log("scrape clicked");
    $.ajax({
      type: "GET",
      url: "/scrape"
    }).then(article => {
      console.log("finished", article);
      location.reload();
    });
    // end of document on click scrape new
  });

  // save an article button
  $(document).on("click", ".saveBtn", function () {
    console.log("saved clicked");
    let ID = $(this).attr("data-id");
    $.ajax({
      type: "GET",
      url: "/saveArticle/" + ID
    }).then(function (data) {
      location.reload();
    });
  });

  // viewing comments of articles button
  $(document).on("click", ".comment", function () {
    let thisID = $(this).attr("data-id");
    $("#commentModal" + thisID).modal("toggle");
    // display all the comments of the article to the comment modal
    $.ajax({
      type: "GET",
      url: "/getComments/" + thisID
    }).then(data => {
      console.log("ARTICLE WITH COMMENT", data);
    });
  });

  // saving a comment button
  $(document).on("click", ".saveComment", function () {
    var thisID = $(this).attr("data-id");
    var newCommentObj = {
      title: $("#newCommentTitle" + thisID)
        .val()
        .trim(),
      body: $("#newCommentBody" + thisID)
        .val()
        .trim()
    };
    console.log(newCommentObj);
    $.ajax({
      type: "POST",
      url: "/saveComment/" + thisID,
      data: newCommentObj
    }).then(data => {
      console.log("response from saving a comment", data);
      // use jquery here to populate comment? with a button that ties in the id of the comment to delete it from the database?
      $("#newCommentTitle" + thisID).val("");
      $("#newCommentBody" + thisID).val("");
    });
  });
  // end of document ready
});
