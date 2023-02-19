document.addEventListener("click", (event) => {
  const { target } = event;
  const id = target.dataset.id;
  if (id) {
    remove(id);
    target.closest("li").remove();
  }
});

async function remove(id) {
  return await fetch(`${id}`, { method: "DELETE" });
}
