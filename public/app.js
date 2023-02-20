document.addEventListener("click", (event) => {
  const { target } = event;

  const removeBtn = target.classList.contains("_remove");
  const editBtn = target.classList.contains("_edit");

  if (removeBtn) {
    const task = target.closest("li");
    const taskId = task.dataset.id;

    remove(taskId);
    task.remove();
  }

  if (editBtn) {
    const task = target.closest("li");
    const taskId = task.dataset.id;
    const newTitle = prompt("Enter new title name");

    if (newTitle !== null && newTitle.trim() !== "") {
      edit({ id: taskId, title: newTitle });
      task.querySelector(".list-group-item__title").textContent = newTitle;
    }
  }
});

async function edit(data) {
  return await fetch(`/`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function remove(id) {
  return await fetch(`${id}`, { method: "DELETE" });
}
