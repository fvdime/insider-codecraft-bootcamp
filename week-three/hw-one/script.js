$(document).ready(function () {
  $("#addTaskButton").click(function () {
    const taskText = $("#taskInput").val().trim();
    if (taskText !== "") {
      const newTask = $("<li>").text(taskText);
      const taskTextSpan = $("<span>").addClass("task-text").text(taskText);
      const deleteButton = $("<button>").addClass("deleteButton").text("Delete");
      const completeButton = $("<button>").addClass("completeButton").text("Complete");
      const buttonContainer = $("<div>").addClass("button-container").append(completeButton, deleteButton);
      
      newTask.append(taskTextSpan);
      newTask.append(buttonContainer);
      $("#taskList").append(newTask);
      $("#taskInput").val("");
    }
  });

  // COMPLETE TOGGLE
  $("#taskList").on("click", ".completeButton", function () {
    $(this).closest("li").toggleClass("completed");
  });

  // DELETE
  $("#taskList").on("click", ".deleteButton", function (event) {
    event.stopPropagation(); 
    $(this).closest("li").remove();
  });
});