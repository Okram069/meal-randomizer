// Define meals array
let meals = JSON.parse(localStorage.getItem("meals") || "[]");
updateMealList();

function addMeal() {
  const input = document.getElementById("meal-input");
  const name = input.value.trim();
  if (!name) return;
  input.value = "";
  openCategoryModal(name);
}

function openCategoryModal(name) {
  const modal = document.getElementById("categoryModal");
  modal.classList.remove("hidden");
  modal.dataset.mealName = name;
}

function closeModal() {
  document.getElementById("categoryModal").classList.add("hidden");
}

function saveCategories() {
  const modal = document.getElementById("categoryModal");
  const name = modal.dataset.mealName;
  const checkboxes = modal.querySelectorAll("input[type='checkbox']:checked");
  const radios = modal.querySelectorAll("input[type='radio']:checked");
  const custom = document.getElementById("custom-categories").value;

  const categories = [...checkboxes, ...radios].map(e => e.value);
  if (custom) categories.push(...custom.split(',').map(c => c.trim()));
  meals.push({ name, categories });
  saveMeals();
  closeModal();
}

function skipCategories() {
  const modal = document.getElementById("categoryModal");
  const name = modal.dataset.mealName;
  meals.push({ name, categories: [] });
  saveMeals();
  closeModal();
}

function saveMeals() {
  localStorage.setItem("meals", JSON.stringify(meals));
  updateMealList();
}

function updateMealList() {
  const list = document.getElementById("meal-list");
  const count = document.getElementById("meal-count");
  list.innerHTML = "";
  meals.forEach((meal, i) => {
    const li = document.createElement("li");
    li.innerHTML = \`\${meal.name} <button onclick="editMeal(\${i})">✏️</button> <button onclick="deleteMeal(\${i})">🗑️</button>\`;
    list.appendChild(li);
  });
  count.textContent = \`(\${meals.length})\`;
}

function deleteMeal(index) {
  meals.splice(index, 1);
  saveMeals();
}

function editMeal(index) {
  const newName = prompt("Edit meal name:", meals[index].name);
  if (newName) {
    meals[index].name = newName.trim();
    saveMeals();
  }
}

function generatePlan() {
  const days = parseInt(document.getElementById("days-input").value);
  const result = document.getElementById("plan-result");
  if (!meals.length || days <= 0) return alert("Add meals first!");
  const shuffled = [...meals].sort(() => 0.5 - Math.random());
  result.innerHTML = "";
  for (let i = 0; i < days && i < shuffled.length; i++) {
    const li = document.createElement("li");
    li.textContent = shuffled[i].name;
    result.appendChild(li);
  }
}

function exportMeals() {
  const blob = new Blob([JSON.stringify(meals)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "meals.json";
  a.click();
}

function importMeals(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      meals = JSON.parse(e.target.result);
      saveMeals();
    } catch {
      alert("Invalid JSON file");
    }
  };
  reader.readAsText(file);
}